<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 0.5rem solid #ffffff">
      <el-aside width="50%" style="border: 0.5rem solid #ffffff">
        <h2>业内平台涉及禁止交易模式状况</h2>
        <el-table
          :data="dataIndustryPolicy"
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          @row-click="onClickTableIndustry"
        >
          <el-table-column
            label="序号"
            fixed="left"
            prop="id"
            min-width="50"
          ></el-table-column>
          <el-table-column
            label="平台名称"
            prop="platform"
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="涉及禁止交易模式"
            prop="transactionMode"
            min-width="90"
          ></el-table-column>
          <el-table-column label="影响详情" min-width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="gotoSpread(scope.row.platform)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
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
      <el-container style="border: 0.5rem solid #ffffff">
        <div id="tablePolicyDetail" style="width: 100%; height: 100%">
          <h2>关系图</h2>
          <div class="force-base-ii">
            <div class="outborder">
              <div class="inA">
                <el-button class="inborderA" circle></el-button>
                <div class="user">交易账户</div>
                <!--div class="inborderA"></div>
                <div class="tracom">交易商品</div-->
              </div>
              <div class="inB">
                <div class="inborderB"></div>
                <div class="finan">交易数量</div>
              </div>
            </div>
            <svg width="700" height="500" class="container-border"></svg>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  getIndustryPolicy,
  getIndustryPolicyDetail,
} from "@/api/part1/policyRisk";
import * as d3 from "d3";
export default {
  data() {
    return {
      total: 0,
      dataIndustryPolicy: [],
      id: 1,
    };
  },
  created() {
    // table IndustryPolicy
    this.queryIndustryPolicy(1, 10);
  },
  mounted() {
    console.log(this.node);
    document.getElementById("tablePolicyDetail").style.display = "none";
    // this.creatA();
  },
  methods: {
    getHeaderStylesheet() {
      return {
        "background-color": "#f8f8f8",
        color: "#909399",
        "font-weight": "bold",
        "padding-top": "20px",
        "padding-bottom": "20px",
      };
    },
    creatA(nodes, edges) {
      let linkGroup = {};
      let linkmap = {};
      for (let i = 0; i < edges.length; i++) {
        let key =
          nodes[edges[i].source].name < nodes[edges[i].target].name
            ? nodes[edges[i].source].name + ":" + nodes[edges[i].target].name
            : nodes[edges[i].target].name + ":" + nodes[edges[i].source].name;
        if (!Object.prototype.hasOwnProperty.call(linkmap, key)) {
          linkmap[key] = 0;
        }
        linkmap[key] += 1;
        if (!Object.prototype.hasOwnProperty.call(linkGroup, key)) {
          linkGroup[key] = [];
        }
        linkGroup[key].push(edges[i]);
      }
      //为每一条连接线分配size属性，同时对每一组连接线进行编号
      for (let i = 0; i < edges.length; i++) {
        let key =
          nodes[edges[i].source].name < nodes[edges[i].target].name
            ? nodes[edges[i].source].name + ":" + nodes[edges[i].target].name
            : nodes[edges[i].target].name + ":" + nodes[edges[i].source].name;
        edges[i].size = linkmap[key];
        //同一组的关系进行编号
        let group = linkGroup[key];
        let keyPair = key.split(":");
        let type = "noself"; //标示该组关系是指向两个不同实体还是同一个实体
        if (keyPair[0] == keyPair[1]) {
          type = "self";
        }
        //给节点分配编号
        setLinkNumber(group, type,nodes);
      }
      console.log(edges);
      let marge = { top: 0, bottom: 0, left: 60, right: 60 };
      let svg = d3.select("svg");
      svg.selectAll("*").remove(); //清空原图
      let marker = svg
        .append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("viewBox", "0 0 12 12") //坐标系的区域
        .attr("refX", 16) //箭头坐标
        .attr("refY", 6)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .append("path")
        .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2") //箭头的路径
        .attr("fill", "#999"); //箭头颜色
      let width = svg.attr("width");
      let height = svg.attr("height");
      let g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
      // Node Dataset
      // 节点集
      
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
          return 150;
        });
      // Set drawing center location
      // 设置图形中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 6);
      // Draw side
      // 绘制边
      var path = g
        .append("g")
        .selectAll("path")
        .data(edges)
        .enter()
        .append("path")
        .attr("stroke", this.linkColor)
        .attr("stroke-width", 1.5)
        .attr("fill","none")
        .attr('id', function(d,i){return 'edgepath'+i;})
        .attr("marker-end", "url(#arrow)");
      let links = g
        .append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", this.linkColor)
        .attr("stroke-width", 1.5)
        .attr("marker-end", "url(#arrow)");
      // Text on side
      // 边上的文字
      let linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text");
      linksText.append('textPath')
        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
        .style("text-anchor", "middle")
        .attr("startOffset", "50%")
        .text(function (d) {
          return d.value;
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
        path.attr("d", function (d) {
          //如果连接线连接的是同一个实体，则对path属性进行调整，绘制的圆弧属于长圆弧，同时对终点坐标进行微调，避免因坐标一致导致弧无法绘制
          if (d.target.name == d.source.name) {
            dr = 30 / d.linknum;
            return (
              "M" +
              d.source.x +
              "," +
              d.source.y +
              "A" +
              dr +
              "," +
              dr +
              " 0 1,1 " +
              d.target.x +
              "," +
              (d.target.y + 1)
            );
          } else if (d.size % 2 != 0 && d.linknum == 1) {
            //如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
            return (
              "M " +
              d.source.x +
              " " +
              d.source.y +
              " L " +
              d.target.x +
              " " +
              d.target.y
            );
          }
          //根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
          //注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
          var curve = 1.5;
          var homogeneous = 1.2;
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr =
              (Math.sqrt(dx * dx + dy * dy) * (d.linknum + homogeneous)) /
              (curve * homogeneous);
          //当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
          if (d.linknum < 0) {
            dr =
              (Math.sqrt(dx * dx + dy * dy) * (-1 * d.linknum + homogeneous)) /
              (curve * homogeneous);
            return (
              "M" +
              d.source.x +
              "," +
              d.source.y +
              "A" +
              dr +
              "," +
              dr +
              " 0 0,0 " +
              d.target.x +
              "," +
              d.target.y
            );
          }
          return (
            "M" +
            d.source.x +
            "," +
            d.source.y +
            "A" +
            dr +
            "," +
            dr +
            " 0 0,1 " +
            d.target.x +
            "," +
            d.target.y
          );
        });
        /*
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
        */
        /*
        linksText
          .attr("x", function (d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function (d) {
            return (d.source.y + d.target.y) / 2;
          });
          */
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
      function setLinkNumber(group, type,nodes) {
        if (group.length == 0) return;
        //对该分组内的关系按照方向进行分类，此处根据连接的实体ASCII值大小分成两部分
        var linksA = [],
          linksB = [];
        for (let i = 0; i < group.length; i++) {
          var link = group[i];
          if (nodes[link.source].name < nodes[link.target].name) {
            linksA.push(link);
          } else {
            linksB.push(link);
          }
        }
        console.log(linksA)
        //确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
        //特殊情况：当关系都是连接到同一个实体时，不平分
        var maxLinkNumber = 0;
        if (type == "self") {
          maxLinkNumber = group.length;
        } else {
          maxLinkNumber =
            group.length % 2 == 0 ? group.length / 2 : (group.length + 1) / 2;
        }
        //如果两个方向的关系数量一样多，直接分别设置编号即可
        if (linksA.length == linksB.length) {
          let startLinkNumber = 1;
          for (let i = 0; i < linksA.length; i++) {
            linksA[i].linknum = startLinkNumber++;
          }
          startLinkNumber = 1;
          for (let i = 0; i < linksB.length; i++) {
            linksB[i].linknum = startLinkNumber++;
          }
        } else {
          //当两个方向的关系数量不对等时，先对数量少的那组关系从最大编号值进行逆序编号，然后在对另一组数量多的关系从编号1一直编号到最大编号，再对剩余关系进行负编号
          //如果抛开负号，可以发现，最终所有关系的编号序列一定是对称的（对称是为了保证后续绘图时曲线的弯曲程度也是对称的）
          var biggerLinks, smallerLinks;
          if (linksA.length > linksB.length) {
            biggerLinks = linksA;
            smallerLinks = linksB;
          } else {
            biggerLinks = linksB;
            smallerLinks = linksA;
          }

          let startLinkNumber = maxLinkNumber;
          for (var i = 0; i < smallerLinks.length; i++) {
            smallerLinks[i].linknum = startLinkNumber--;
          }
          var tmpNumber = startLinkNumber;

          startLinkNumber = 1;
          var p = 0;
          while (startLinkNumber <= maxLinkNumber) {
            biggerLinks[p++].linknum = startLinkNumber++;
          }
          //开始负编号
          startLinkNumber = 0 - tmpNumber;
          for (let i = p; i < biggerLinks.length; i++) {
            biggerLinks[i].linknum = startLinkNumber++;
          }
        }
      }
    },
    circleColor(d) {
      if (d.type === "1") {
        return "#0489DF";
      } else if (d.type === "2") {
        return "#F1D672";
      } else {
        return "#8D180C";
      }
    },
    linkColor(d) {
      if (d.typeid === "1") {
        return "black";
      } else {
        return "#A86F67";
      }
    },
    gotoSpread(platform) {
      this.$router.push(`/trade/PolicyRisk/viewIndustryPolicyco/${platform}`);
    },
    queryIndustryPolicy(currentPage, pageSize) {
      getIndustryPolicy(currentPage, pageSize)
        .then((res) => {
          console.log("请求列表api成功");
          console.log(res);
          this.dataIndustryPolicy = res.data.data.reslist;
          this.total = res.data.data.total;
          let svg = d3.select("svg");
          svg.selectAll("*").remove(); //清空原图
        })
        .catch((err) => {
          console.log(err);
          console.log("请求列表api失败");
        });
    },
    pageChange(page) {
      this.currentPage = page;
      this.queryIndustryPolicy(page, 10);
    },
    onClickTableIndustry(row) {
      document.getElementById("tablePolicyDetail").style.display = "block";
      this.id = row.id;
      this.queryIndustryPolicyDetail(row.id);
    },
    queryIndustryPolicyDetail(id) {
      getIndustryPolicyDetail(id)
        .then((res) => {
          let data = res.data.data;
          console.log(res);
          let node = [];
          let edge = [];
          node.push({
            name: data[0][0],
            type: "1",
          });
          for (let i = 1; i < data[0].length; i++) {
            node.push({
              name: data[0][i],
              type: "2",
            });
          }
          console.log(node);
          for (let i = 0; i < data[1].length; i++) {
            edge.push({
              source: data[1][i].source,
              target: data[1][i].target,
              value: data[1][i].value,
              typeid: "2",
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
  },
};
</script>
<style scoped>
.outborder {
  margin: 5px 0px 5px 550px;
  width: 200px;
  height: 100px;
  border: 1px solid #8ea7b8;
}
/*
.inA{
  height: 30px;
  width: 180px;
  margin:30px 0px 5px 10px;
}
.inborderA{
  width: 90px;
  height: 1px;
  background:black;
}
*/
.inA {
  margin: 20px 100px 5px 13px;
}
.inborderA {
  background-color: #f1d672;
}
.user {
  width: 90px;
  margin: -23px 0px 0px 97px;
}
.tracom {
  width: 90px;
  margin: -12px 0px 0px 100px;
}
.inB {
  margin: 20px 10px 5px 10px;
}
.inborderB {
  width: 90px;
  border-top: 1px solid #a86f67;
}
.finan {
  width: 90px;
  margin: -12px 0px 0px 100px;
}
</style>