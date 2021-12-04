<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 0.5rem solid #eee">
      <el-aside width="50%" style="border: 0.5rem solid #eee">
        <h2>异常交易模式风险传播</h2>
        <el-table :data="dataImpact" highlight-current-row>
          <el-table-column
            label="平台名称"
            fixed="left"
            prop="platform"
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="主要交易商品"
            prop="commodity"
            min-width="140"
          ></el-table-column>
          <el-table-column label="政策风险等级" min-width="70">
            <template slot="header">
              <span
                >政策风险等级<el-button
                  class="buttonclick"
                  type="warning"
                  icon="iconfont icon-icon-test"
                  size="mini"
                  circle
                  @click="dialogVisible = true"
                ></el-button
              ></span>
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.riskLevel === '一级风险'" class="first">{{
                scope.row.riskLevel
              }}</span>
              <span
                v-else-if="scope.row.riskLevel === '二级风险'"
                class="second"
                >{{ scope.row.riskLevel }}</span
              >
              <span
                v-else-if="scope.row.riskLevel === '三级风险'"
                class="third"
                >{{ scope.row.riskLevel }}</span
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="风险等级说明"
          :visible.sync="dialogVisible"
          width="35%"
        >
          <div class="first">—级预警:交易平台受政策不利因素直接影响</div>
          <div class="second">
            二级预警:与其相关性高的交易平台受政策不利因素直接影响（跳数范围)
          </div>
          <div class="third">
            三级预警:与其相关性中的交易平台受政策不利因素直接影响（跳数范围)
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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
      <el-container style="border: 0.5rem solid #eee">
        <div id="tableSpaceDetail" style="width: 100%; height: 100%">
          <h2>政策风险传播关系图</h2>
          <div class="force-base-ii">
            <div class="outborder">
              <div class="inA">
                <el-button class="inborderA" circle></el-button>
                <div class="main">主交易平台</div>
              </div>
              <div class="inB">
                <el-button class="inborderB" circle></el-button>
                <div class="other">交易平台</div>
              </div>
              <!--div class="inC">
                <el-button class="inborderC" circle></el-button>
                <div class="policy">政策</div>
              </div-->
            </div>
            <svg width="700" height="500" class="container-border"></svg>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getImpact, getImpactDetail } from "@/api/part1/policyRisk";
import * as d3 from "d3";
export default {
  data() {
    return {
      //platName: "南方稀贵金属交易所",
      dialogVisible: false,
      dataImpact: [],
      total: 0,
      node: [],
      edge: [],
    };
  },
  created() {
    const platform = this.$router.currentRoute.params.platform;
    this.queryImpact(platform, 1, 10);
    this.queryImpactDetail(platform);
  },
  mounted() {},
  methods: {
    creatB() {
      // create somewhere to put the force directed graph
      let svg = d3.select("svg");
      let width = +svg.attr("width");
      let height = +svg.attr("height");
      let radius = 20;
      let nodesData = this.node;
      // Sample links data
      // type: A for Ally, E for Enemy
      let linksData = this.edge;
      // set up the simulation and add forces
      let simulation = d3.forceSimulation().nodes(nodesData);
      let linkForce = d3.forceLink(linksData);
      //.id(function (d) { return d.name })
      let chargeForce = d3.forceManyBody().strength(-100);
      let centerForce = d3.forceCenter(width / 2, height / 3);
      simulation
        .force("chargeForce", chargeForce)
        .force("centerForce", centerForce)
        .force("links", linkForce.distance(170));
      // add tick instructions:
      simulation.on("tick", tickActions);
      // add encompassing group for the zoom
      let g = svg.append("g").attr("class", "everything");
      // draw lines for the links
      let svg1 = d3.select("svg");
      let marker = svg1
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

      let link = g
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(linksData)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .style("stroke", "#A68C74")
        .attr("marker-end", "url(#arrow)");
      // draw circles for the nodes
      let node = g
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodesData)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", circleColour);
      console.log("node: ", node);
      // add title
      node.append("title").text(function (d) {
        return d.name;
      });
      // add drag capabilities
      let dragHandler = d3
        .drag()
        .on("start", dragStart)
        .on("drag", dragDrag)
        .on("end", dragEnd);
      dragHandler(node);
      // add zoom capabilities
      let zoomHandler = d3.zoom().on("zoom", zoomActions);
      zoomHandler(svg);
      /** Functions **/
      // Function to choose what color circle we have
      // Let's return blue for males and red for females
      function circleColour(d) {
        if (d.type === "0") {
          return "#C22D3B";
        } else if (d.type === "1") {
          return "#0489DF";
        } else {
          return "#C69BAE";
        }
      }
      // Function to choose the line colour and thickness
      // If the link type is 'A' return green
      // If the link type is 'E' return red
      // Drag functions
      // d is the node
      function dragStart(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      // make sure you can't drag the circle outside the box
      function dragDrag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragEnd(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      // Zoom functions
      function zoomActions() {
        g.attr("transform", d3.event.transform);
      }
      function tickActions() {
        // update circle positions each tick of the simulation
        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
        // update link positions
        link
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
      }
    },
    queryImpact(platform, currentPage, pageSize) {
      getImpact(platform, currentPage, pageSize)
        .then((res) => {
          console.log("请求列表api成功");
          console.log(res);
          this.dataImpact = res.data.data.reslist;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
          console.log("请求列表api失败");
        });
    },
    pageChange(page) {
      this.currentPage = page;
      this.queryImpact(page, 10);
    },
    queryImpactDetail(platform) {
      getImpactDetail(platform)
        .then((res) => {
          let data = res.data.data;
          console.log(res);
          this.node = [];
          this.edge = [];
          for (let i = 0; i < data[0].length; i++) {
            this.node.push({
              name: data[0][i].name,
              type: data[0][i].type,
            });
          }
          for (let i = 0; i < data[1].length; i++) {
            this.edge.push({
              source: data[1][i].source,
              target: data[1][i].target,
              typeid: data[1][i].typeid,
            });
          }
          this.creatB();
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
.buttonclick {
  height: 33px;
  margin-left: 5px;
}
.first {
  font-size: 18px;
  color: red;
}
.second {
  font-size: 18px;
  color: orange;
}
.third {
  font-size: 18px;
  color: #ffd700;
}
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
  background-color: #c22d3b;
}
.main {
  width: 90px;
  margin: -23px 0px 0px 50px;
}
.inB {
  margin: 5px 150px 5px 13px;
}
.inborderB {
  background-color: #0489df;
}
.other {
  width: 90px;
  margin: -23px 0px 0px 50px;
}
.inC {
  margin: 5px 150px 5px 13px;
}
.inborderC {
  background-color: #c69bae;
}
.policy {
  width: 90px;
  margin: -23px 0px 0px 50px;
}
.link line {
  width: 190px;
}
</style>
