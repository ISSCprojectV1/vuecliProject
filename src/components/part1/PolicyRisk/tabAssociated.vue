<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 0.5rem solid #eee">
      <el-aside width="50%" style="border: 0.5rem solid #eee">
        <h2>相关行业系统性风险</h2>
        <el-table
          :data="dataAssociated"
          highlight-current-row
          :span-method="objectSpanMethod"
          @cell-click="onClickTableAssociated"
          :cell-style="tableCellStyle"
        >
          <el-table-column
            label="行业名称"
            fixed="left"
            prop="industry"
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="原材料品类"
            prop="product"
            min-width="140"
          ></el-table-column>
        </el-table>
        <el-pagination
          ref="pagination"
          style="text-align: center; margin-top: 0.5rem"
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="total"
        >
        </el-pagination>
      </el-aside>
      <el-container style="border: 0.5rem solid #eee"> </el-container>
      <div id="tableSpaceDetail" style="width: 100%; height: 100%">
        <h2>相关行业系统风险传播关系图</h2>
        <div class="force-base-ii">
          <div class="outborder">
            <div class="inA">
              <el-button class="inborderA" circle></el-button>
              <div class="main">行业</div>
            </div>
            <div class="inB">
              <el-button class="inborderB" circle></el-button>
              <div class="other">交易品类</div>
            </div>
          </div>
          <svg width="700" height="500" class="container-border"></svg>
          <div class="instruction">
            <div class="low">低</div>
            <div class="risk"></div>
            <div class="hight">高</div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { getAssociatedDetail, getAssociated } from "@/api/part1/policyRisk";
import * as d3 from "d3";
export default {
  data() {
    return {
      currentPage:1,
      total: 0,
      row: "",
      column: "",
      industry: "",
      spanArr: [],
      dataAssociated: [],
    };
  },
  created() {
    this.queryAssociated(1, 10);
  },
  mounted() {
    console.log(this.node);
    document.getElementById("tableSpaceDetail").style.display = "none";
  },
  methods: {
    creatA(nodes, edges) {
      let marge = { top: 0, bottom: 0, left: 60, right: 60 };
      let svg = d3.select("svg");
      svg.selectAll("*").remove(); //清空原图
      let width = svg.attr("width");
      let height = svg.attr("height");
      let g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
      // Node Dataset
      // 节点集
      console.log(nodes);
      // Side Dataset
      // 边集
      // Set a color scale
      // 设置一个颜色比例尺
      //let colorScale = d3.scaleOrdinal()
      //.domain(d3.range(nodes.length))
      //.range(d3.schemeCategory10)
      // Create a new force guide diagram
      // 新建一个力导向图
      let forceSimulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
      // Generate node data
      // 生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked);
      // Generate side data
      // 生成边数据
      forceSimulation
        .force("link")
        .links(edges)
        .distance(function (d) {
          // side length / 每一边的长度
          return 100;
        });
      // Set drawing center location
      // 设置图形中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 3);
      // Draw side
      // 绘制边
      let links = g
        .append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", this.linkColor)
        .attr("stroke-width", 3);
      // Text on side
      // 边上的文字
      let linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text(function (d) {
          return d.relation;
        });
      // Create group
      // 创建分组
      let gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          let cirX = d.x;
          let cirY = d.y;
          return "translate(" + cirX + "," + cirY + ")";
        })
        .call(
          d3.drag().on("start", started).on("drag", dragged).on("end", ended)
        );
      // Draw node
      // 绘制节点
      gs.append("circle").attr("r", 15).attr("fill", this.circleColor);
      // Draw text
      // 绘制文字
      gs.append("title").text(function (d) {
        return d.name;
      });
      /*
    gs.append('text')
      .attr('x', -10)
      .attr('y', -20)
      .attr('dy', 10)
      .text(function (d) {
        return d.name
      })
    */
      // ticked
      function ticked() {
        links
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });
        linksText
          .attr("x", function (d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function (d) {
            return (d.source.y + d.target.y) / 2;
          });
        gs.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }
      // drag
      function started(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0.8).restart(); // Set the attenuation coefficient to simulate the node position movement process. The higher the value, the faster the movement. The value range is [0, 1] // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0, 1]
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
    },
    circleColor(d) {
      if (d.type === "1") {
        return "#fe5b70";
      } else if (d.type === "2") {
        return "#3ccabc";
      }
    },
    linkColor(d) {
      if (d.typeid === "1") {
        return "#008000";
      } else if (d.typeid === "2") {
        return "#FF0000";
      } else {
        return "#A86F67";
      }
    },
    queryAssociated(currentPage, pageSize) {
      getAssociated(currentPage, pageSize)
        .then((res) => {
          console.log("请求列表api成功");
          console.log(res);
          this.dataAssociated = res.data.data.reslist;
          this.total = res.data.data.total;
          this.getSpanArr(this.dataAssociated);
        })
        .catch((err) => {
          console.log(err);
          console.log("请求列表api失败");
        });
    },
    getSpanArr(data) {
      this.spanArr=[]
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].industry === data[i - 1].industry) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        console.log(this.spanArr);
      }
    },
    pageChange(page) {
      this.currentPage = page;
      this.queryAssociated(page, 10);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    onClickTableAssociated(row, column) {
      this.row = row;
      this.column = column;
      document.getElementById("tableSpaceDetail").style.display = "block";
      this.industry = row.industry;
      this.queryAssociatedDetail(row.industry);
    },
    queryAssociatedDetail(industry) {
      getAssociatedDetail(industry)
        .then((res) => {
          let data = res.data.data;
          console.log(res);
          let node = [];
          let edge = [];
          for (let i = 0; i < data[0].length; i++) {
            node.push({
              name: data[0][i].name,
              type: data[0][i].type,
            });
          }
          console.log(node);
          for (let i = 0; i < data[1].length; i++) {
            edge.push({
              source: data[1][i].source,
              target: data[1][i].target,
              typeid: data[1][i].typeId,
            });
          }
          console.log(edge);
          this.creatA(node, edge);
        })
        .catch((err) => {
          console.log(err);
          console.log("请求列表api失败");
        });
    },

    tableCellStyle(row, rowIndex, column) {
      if (this.row === row.row && this.column === row.column) {
        return "background-color:#ECF5FF;";
      } else {
        return "background-color:#fff;";
      }
    },
  },
};
</script>

<style scoped>
.outborder {
  margin: 5px 0px 5px 600px;
  width: 170px;
  height: 80px;
  border: 1px solid #8ea7b8;
}
.inA {
  margin: 10px 150px 5px 13px;
}
.inborderA {
  background-color: #fe5b70;
}
.main {
  width: 90px;
  margin: -23px 0px 0px 50px;
}
.inB {
  margin: 5px 150px 5px 13px;
}
.inborderB {
  background-color: #3ccabc;
}
.other {
  width: 90px;
  margin: -23px 0px 0px 50px;
}
.instruction {
  margin: -400px 0px 5px 600px;
}
.risk {
  margin: 5px 0px 5px 72px;
  width: 30px;
  height: 180px;
  background-image: linear-gradient(#008000, #ffd700, #ff0000);
}
</style>