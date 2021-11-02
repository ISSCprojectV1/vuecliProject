<template>
  <div class="max">
      <div class="row">
          <div class="columnLeft">政策名称</div>
          <div class="columnRight">{{policyName}}</div>
          <div class="columnLeft">预警等级</div>
          <div class="columnRight">{{warningLevel}}</div>
      </div>
      <div class="row">
          <div class="columnLeft">商品影响</div>
          <div class="columnRight">{{commodities}}</div>
          <div class="columnLeft">交易平台影响</div>
          <div class="columnRight">{{platform}}</div>
      </div>  
        <svg class="d3-tree-vii width-100-percent container-border ">
            <g class="container" />
       </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
        index: 0,
        duration: 750,
        root: null,
        nodes: [],
        links: [],
        dTreeData: null,
        margin: { top: 0, right: 100, bottom: 20, left: 250 },
        selectedNode: null,
        svg: null,
        container: null,
        policyName: "大气污染防治法",
        warningLevel: "一级预警",
        commodities: "钢材 煤炭",
        platform: "南方稀贵金属交易所"
    }
  },
  mounted () {
    let treeData = {
      'name': '行业',
      'children': [
        {
          'name': '商品1',
          'children': [
            { 'name': '交易平台A' },
            { 'name': '交易平台B' },
            { 'name': '交易平台C' },
            { 'name': '交易平台D' },
            { 'name': '交易平台E' }
          ]
        },
        {
          'name': '商品2',
          'children': [
            { 'name': '交易平台A' },
            { 'name': '交易平台B' },
            { 'name': '交易平台C' },
            { 'name': '交易平台D' }
          ]
        },
        {
          'name': '商品3',
          'children': [
            { 'name': '交易平台C' }
          ]
        }
      ]
    }
    this.initSvg(treeData)
  },
  computed: {
    treemap () {
      return d3.tree().nodeSize([30, 60])
    }
  },
  methods: {
    initSvg (treeData) {
      let clientWidth = document.body.clientWidth
      let clientHeight = document.body.clientHeight
      this.width = Math.floor(clientWidth * 0.6)
      this.height = clientHeight - 72
      let margin = ({ top: 0, right: 20, bottom: 0, left: 300 })
      let width = this.width
      // let dy = width / 4
      let dx = 30
      this.svg = d3
        .select('svg.d3-tree-vii')
        .attr('viewBox', [-margin.left, -margin.top, width, dx])
      let translateTop = (this.height - 120) / 2
      let transform = d3.zoomIdentity
        .translate(this.margin.left, translateTop)
        .scale(1)
      console.log(transform) // eslint-disable-line
      this.container = this.svg.select('g.container')
      // init zoom behavior, which is both an object and function
      let zoom = d3
        .zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom', function () {
          d3.select('g.container')
            .attr('transform', d3.event.transform)
        })
      this.svg.call(zoom).on('dblclick.zoom', null)
      this.root = this.getRoot(treeData)
      this.root.x0 = 0
      this.root.y0 = 0
      // this.root.descendants().forEach((d, i) => {
      //   d.id = i
      //   d._children = d.children
      //   if (d.depth && d.data.name.length !== 7) d.children = null
      // })
      this.update(this.root)
    },
    getRoot (treeData) {
      let root = d3.hierarchy(treeData, d => {
        return d.children
      })
      root.x0 = this.height / 2
      // root.x0 = 0
      root.y0 = 0
      return root
    },
    dblclickNode (d) {
      // Double click the node, and expand the node if there are child nodes
      if (d.children) {
        this.$set(d, '_children', d.children)
        d.children = null
      } else {
        this.$set(d, 'children', d._children)
        d._children = null
      }
      this.$nextTick(() => {
        this.update(d)
      })
    },
    clickNode () {
      // console.log('clickNode: ', d)
      // this.selectedNode = d
      // if (d.children) {
      //   this.$set(d, '_children', d.children)
      //   d.children = null
      // } else {
      //   this.$set(d, 'children', d._children)
      //   d._children = null
      // }
      // this.$nextTick(() => {
      //   this.update(d)
      // })
    },
    diagonal (s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
    },
    getNodesAndLinks () {
      this.dTreeData = this.treemap(this.root)
      this.nodes = this.dTreeData.descendants()
      this.links = this.dTreeData.descendants().slice(1)
    },
    // 数据与Dom进行绑定
    update (source) {
      // let self = this
      this.getNodesAndLinks()
      this.nodes.forEach(d => {
        d.y = d.depth * 180
      })
      let node = this.container.selectAll('g.node').data(this.nodes, d => {
        return d.id || (d.id = ++this.index)
      })
      // Enter any new sources at the parent's previous position.
      let nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .on('click', this.clickNode)
        .on('dblclick', this.dblclickNode)
        .attr('transform', () => {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })
      // Add circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          // console.log('d fill: ', d)
          return d._children ? '#c9e4ff' : '#fff'
        })
        // add circle selection style
        // .on('click', function (d) {
        //   d3.select(this)
        //     .transition()
        //     .delay(1)
        //     .style('fill', function () {
        //       return '#54a8ff'
        //     })
        //     .style('stroke-width', function () {
        //       return '4px'
        //     })
        //   // self.update(this)
        // })
      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name })
        .attr('class', 'update')
      // Transition nodes to their new position.
      let nodeUpdate = nodeEnter
        .merge(node)
        .transition()
        .duration(this.duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })
      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })
        .style('stroke-width', function () {
          return '2px'
        })
        .attr('cursor', 'pointer')
      nodeUpdate.select('text').style('fill-opacity', 1)
      // update the text
      node.select('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name })
      // Transition exiting nodes to the parent's new position.
      let nodeExit = node
        .exit()
        .transition()
        .duration(this.duration)
        .attr('transform', function () {
          return 'translate(' + source.y + ',' + source.x + ')'
        })
        .remove()
      nodeExit.select('circle').attr('r', 1e-6)
      nodeExit.select('text').style('fill-opacity', 1e-6)
      // *************************** Links section *************************** //
      // Update the links…
      let link = this.container.selectAll('path.link').data(this.links, d => {
        return d.id
      })
      // Enter any new links at the parent's previous position.
      let linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          let o = { x: source.x0, y: source.y0 }
          return this.diagonal(o, o)
        })
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', '#ccc')
      // Transition links to their new position.
      let linkUpdate = linkEnter.merge(link)
      linkUpdate
        .transition()
        .duration(this.duration)
        .attr('d', d => {
          return this.diagonal(d, d.parent)
        })
      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(this.duration)
        .attr('d', () => {
          let o = { x: source.x, y: source.y }
          return this.diagonal(o, o)
        })
        .remove()
      // Stash the old positions for transition.
      this.nodes.forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }
  }
}
</script>

<style scoped>
.max{
    flex-direction: row;
    border: 0.5rem solid #eee;
}
.row{
     display: flex;
}
.columnLeft{
  border: 5px solid rgb(255, 255, 255);
  width: 15%;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  color: #FFFFFF;
  text-align: center;
  background: #388BC8;
}
.columnRight{
  border: 5px solid rgb(255, 255, 255);
  width: 35%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  text-align: center;
}
.width-100-percent {
  width: 100%;
  height: calc(100vh - 74px);
}
</style>
<style>
.d3-tree-vii circle {
  fill: #fff;
  stroke: #54a8ff;
  stroke-width: 2px;
}
.d3-tree-vii .node text {
  font: 12px sans-serif;
}
.d3-tree-vii .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>