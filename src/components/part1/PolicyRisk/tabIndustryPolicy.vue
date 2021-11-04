<template>
  <div style="width: 100%">
    <el-container style="height: 700px; border: 0.5rem solid #eee">
      <el-aside width="50%" style="border: 0.5rem solid #eee">
        <h2>业内政策不利因素</h2>
        <el-table :data="dataIndustryPolicy" highlight-current-row @row-click="onClickTableSpace">
          <el-table-column label="平台名称" fixed="left" prop="platform" min-width="100"></el-table-column>
          <el-table-column label="涉及禁止交易模式" prop="transaction_mode" min-width="160"></el-table-column>
          <el-table-column label="详情" min-width="80">
            <template slot-scope="flat">
              <el-button type="text" @click="getFlats(flat.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            ref="pagination"
            style="text-align: center; margin-top: 0.5rem"
            background
            layout="prev, pager, next"
            @current-change="onPageChangeSpace"
            :total="totalTableSpace">
        </el-pagination>
      </el-aside>
      <el-container style="border: 0.5rem solid #eee">
        <div id="tableSpaceDetail" style="width: 100%; height: 100%">
          <h2>关系图</h2>
          <div class="force-base-ii">
            <div class="outborder">
              <div class="inA">
                <div class="inborderA"></div>
                <div class="tracom">交易商品</div>
              </div>
              <div class="inB">
                <div class="inborderB"></div>
                <div class="finan">融资手段</div>
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
import * as d3 from 'd3'
export default {
  data () {
    return {
      dataIndustryPolicy: [{
        platform: '南方稀贵金属交易所',
        transaction_mode: '小麦'
      },{
        platform: '天地红辣椒电子交易市场',
        transaction_mode: '融资手段'
      }]
    }
  },
  mounted () {
    let marge = { top: 0, bottom: 0, left: 60, right: 60 }
    let svg = d3.select('svg')
    let width = svg.attr('width')
    let height = svg.attr('height')
    let g = svg.append('g')
      .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
    // Node Dataset
    // 节点集
    let nodes = [
      { name: '交易平台A', type: '1' },
      { name: '交易平台B', type: '1' },
      { name: '交易平台C', type: '1' },
      { name: '交易平台D', type: '1' },
      { name: '交易账户1', type: '2' },
      { name: '交易账户2', type: '2' },
      { name: '交易账户3', type: '2' },
      { name: '银行a', type: '3' },
      { name: '银行b', type: '3' }
    ]
    // Side Dataset
    // 边集
    let edges = [
      { source: 4, target: 0,  value: 1, typeid: '1' },
      { source: 4, target: 2,  value: 1, typeid: '1' },
      { source: 4, target: 3,  value: 1, typeid: '1' },
      { source: 5, target: 1,  value: 2, typeid: '1' },
      { source: 5, target: 3,  value: 0.9, typeid: '1' },
      { source: 6, target: 0,  value: 1, typeid: '1' },
      { source: 6, target: 2,  value: 1.6, typeid: '1' },
      { source: 7, target: 2,  value: 0.7, typeid: '2' },
      { source: 8, target: 3,  value: 2, typeid: '2' }
    ]
    // Set a color scale
    // 设置一个颜色比例尺
    //let colorScale = d3.scaleOrdinal()
      //.domain(d3.range(nodes.length))
      //.range(d3.schemeCategory10)
    // Create a new force guide diagram
    // 新建一个力导向图
    let forceSimulation = d3.forceSimulation()
      .force('link', d3.forceLink())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
    // Generate node data
    // 生成节点数据
    forceSimulation.nodes(nodes)
      .on('tick', ticked)
    // Generate side data
    // 生成边数据
    forceSimulation.force('link')
      .links(edges)
      .distance(function (d) { // side length / 每一边的长度
        return d.value * 100
      })
    // Set drawing center location
    // 设置图形中心位置
    forceSimulation.force('center')
      .x(width / 2)
      .y(height / 4)
    // Draw side
    // 绘制边
    let links = g.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', this.linkColor)
      .attr('stroke-width', 1.5)
    // Text on side
    // 边上的文字
    let linksText = g.append('g')
      .selectAll('text')
      .data(edges)
      .enter()
      .append('text')
      .text(function (d) {
        return d.relation
      })
    // Create group
    // 创建分组
    let gs = g.selectAll('.circleText')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        let cirX = d.x
        let cirY = d.y
        return 'translate(' + cirX + ',' + cirY + ')'
      })
      .call(d3.drag()
        .on('start', started)
        .on('drag', dragged)
        .on('end', ended)
      )
    // Draw node
    // 绘制节点
    gs.append('circle')
      .attr('r', 15)
      .attr('fill', this.circleColor)
    // Draw text
    // 绘制文字
    gs.append('text')
      .attr('x', -10)
      .attr('y', -20)
      .attr('dy', 10)
      .text(function (d) {
        return d.name
      })
    // ticked
    function ticked () {
      links
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
      linksText
        .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
        .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
      gs
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
    }
    // drag
    function started (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0.8).restart() // Set the attenuation coefficient to simulate the node position movement process. The higher the value, the faster the movement. The value range is [0, 1] // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0, 1]
      }
      d.fx = d.x
      d.fy = d.y
    }
    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }
    function ended (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    }
  },
  methods: {
    circleColor (d) {
      if (d.type === '1') {
        return '#0489DF'
      } else if(d.type === '2') {
        return '#F1D672'
      } else{
        return '#8D180C'
      }
    },
    linkColor (d) {
      if (d.typeid === '1') {
        return 'black'
      } else {
        return '#A86F67'
      }
    }
  }
}
</script>
<style scoped>
.outborder{
  margin:5px 0px 5px 550px;
  width: 200px;    
  height: 100px;    
  border:1px solid #8EA7B8
}
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
.tracom{
  width: 90px;
  margin: -12px 0px 0px 100px;
}
.inB{
  margin:20px 10px 5px 10px;
}
.inborderB{
  width: 90px;
  border-top: 1px solid #A86F67;
}
.finan{
  width: 90px;
  margin: -12px 0px 0px 100px;
}
</style>