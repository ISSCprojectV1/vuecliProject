<template>
    <div id="t">
        <div id="t1" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"></div>
        <svg id="t2" width="960" height="600"></svg>
        <el-button @click="change">用户群组关系图</el-button>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: "main2",
        methods: {
            change() {

                const marge = {top:60,bottom:60,left:60,right:60}
                let svg = d3.select("#t2")
                const width = svg.attr("width")
                const height = svg.attr("height")
                const g = svg.append("g")
                    .attr("transform","translate("+marge.top+","+marge.left+")");

                let tooltip=d3.select("#t1")
                    .attr("class","tooltip")
                    .style("opacity",0.0);

                //准备数据
                const nodes = [
                    {name: "用户0", group: 0,score:120},
                    {name: "用户1", group: 0,score:110},
                    {name: "用户2", group: 0,score:100},
                    {name: "用户3", group: 0,score:130},
                    {name: "用户4", group: 0,score:140},
                    {name: "用户5", group: 0,score:105},
                    {name: "用户6", group: 0,score:95},
                    {name: "用户7", group: 0,score:20},
                    {name: "用户8", group: 1,score:0},
                    {name: "用户9", group: 1,score:200},
                    {name: "用户10", group: 1,score:50},
                    {name: "用户11", group: 1,score:20},
                    {name: "用户12", group: 1,score:40},
                    {name: "用户13", group: 1,score:80},
                    {name: "用户14", group: 1,score:50},
                    {name: "用户15", group: 1,score:10}
                ];

                const edges = [
                    {source: 0, target: 4, value: 1},
                    {source: 0, target: 5, value: 1},
                    {source: 0, target: 3, value: 1},
                    {source: 0, target: 2, value: 1},
                    {source: 1, target: 4, value: 1},
                    {source: 1, target: 2, value: 1},
                    {source: 1, target: 7, value: 1},
                    {source: 2, target: 6, value: 1},
                    {source: 2, target: 5, value: 1},
                    {source: 2, target: 0, value: 1},
                    {source: 2, target: 4, value: 1},
                    {source: 2, target: 1, value: 1},
                    {source: 3, target: 7, value: 1},
                    {source: 3, target: 0, value: 1},
                    {source: 4, target: 0, value: 1},
                    {source: 4, target: 10, value: 1},
                    {source: 4, target: 2, value: 1},
                    {source: 4, target: 1, value: 1},
                    {source: 5, target: 0, value: 1},
                    {source: 5, target: 11, value: 1},
                    {source: 5, target: 7, value: 1},
                    {source: 5, target: 2, value: 1},
                    {source: 6, target: 11, value: 1},
                    {source: 6, target: 7, value: 1},
                    {source: 6, target: 2, value: 1},
                    {source: 7, target: 6, value: 1},
                    {source: 7, target: 5, value: 1},
                    {source: 7, target: 3, value: 1},
                    {source: 7, target: 1, value: 1},
                    {source: 8, target: 10, value: 1},
                    {source: 8, target: 14, value: 1},
                    {source: 8, target: 11, value: 1},
                    {source: 8, target: 9, value: 1},
                    {source: 8, target: 15, value: 1},
                    {source: 9, target: 14, value: 1},
                    {source: 9, target: 12, value: 1},
                    {source: 9, target: 8, value: 1},
                    {source: 10, target: 8, value: 1},
                    {source: 10, target: 14, value: 1},
                    {source: 10, target: 12, value: 1},
                    {source: 10, target: 13, value: 1},
                    {source: 10, target: 11, value: 1},
                    {source: 10, target: 4, value: 1},
                    {source: 11, target: 10, value: 1},
                    {source: 11, target: 13, value: 1},
                    {source: 11, target: 8, value: 1},
                    {source: 11, target: 5, value: 1},
                    {source: 11, target: 6, value: 1},
                    {source: 12, target: 9, value: 1},
                    {source: 12, target: 10, value: 1},
                    {source: 13, target: 10, value: 1},
                    {source: 13, target: 11, value: 1},
                    {source: 14, target: 10, value: 1},
                    {source: 14, target: 8, value: 1},
                    {source: 14, target: 9, value: 1},
                    {source: 15, target: 8, value: 1}
                ];
                //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
                const colorScale = d3.scaleOrdinal()
                    .domain(d3.range(nodes.length))
                    .range(d3.schemeCategory10);

                const forceSimulation = d3.forceSimulation()
                    .force("link",d3.forceLink())
                    .force("charge",d3.forceManyBody())
                    .force("center",d3.forceCenter());

                //生成节点数据
                forceSimulation.nodes(nodes)
                    .on("tick",ticked);//这个函数很重要，后面给出具体实现和说明


                //生成边数据
                forceSimulation.force("link")
                    .links(edges)
                    .distance(function(d){//每一边的长度
                        return d.value*100;
                    })

                //设置图形的中心位置
                forceSimulation.force("center")
                    .x(width/2)
                    .y(height/2);




                //在浏览器的控制台输出
                console.log(nodes);
                console.log(edges);
                let scores = nodes.map(a => a.score);
                let minScore = d3.min(scores);
                let maxScore = d3.max(scores);
                console.log(minScore);
                console.log(maxScore);
                //绘制边
                const links = g.append("g")
                    .selectAll("line")
                    .data(edges)
                    .enter()
                    .append("line")
                    .attr("stroke",function(d){
                        return colorScale(d.source.group);
                        //return colorScale(this.nodes[d.source].group)
                    })
                    .attr("stroke-width",1);


                const linksText = g.append("g")
                    .selectAll("text")
                    .data(edges)
                    .enter()
                    .append("text")
                    .text(function(d){
                        return d.value;
                    })

                const gs = g.selectAll(".circleText")
                    .data(nodes)
                    .enter()
                    .append("g")
                    .attr("transform",function(d){
                        var cirX = d.x;
                        var cirY = d.y;
                        return "translate("+cirX+","+cirY+")";
                    })
                    .call(d3.drag()
                        .on("start",started)
                        .on("drag",dragged)
                        .on("end",ended)
                    );

                //绘制节点
                gs.append("circle")
                    .attr("fill",function(d){
                        return colorScale(d.group);
                    })
                    .attr("r",function (d) {
                        return d.score*15/(maxScore-minScore)+5;
                    })
                    .on("mouseover",function (d) {
                        tooltip
                            .html("<p>"+d.name+"</p><p>积分:"+d.score+"</p>")
                            .style("left",(d3.event.pageX) +"px")
                            .style("top",(d3.event.pageY +20)+"px")
                            .style("color",colorScale(d.group))
                            .transition()
                            .duration(1000)
                            .style("opacity",1.0)
                        console.log(d.score)
                    })
                    .on("mouseout",function () {
                        tooltip
                            .transition()
                            .duration(1000)
                            .style("opacity",0.0);
                    });
                //文字
                gs.append("text")
                    .attr("x",-10)
                    .attr("y",-20)
                    .attr("dy",10)
                    .text(function(d){
                        return d.name;
                    })


                function ticked(){
                    links
                        .attr("x1",function(d){return d.source.x;})
                        .attr("y1",function(d){return d.source.y;})
                        .attr("x2",function(d){return d.target.x;})
                        .attr("y2",function(d){return d.target.y;});

                    linksText
                        .attr("x",function(d){
                            return (d.source.x+d.target.x)/2;
                        })
                        .attr("y",function(d){
                            return (d.source.y+d.target.y)/2;
                        });

                    gs
                        .attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                }

                function started(d){
                    if(!d3.event.active){
                        forceSimulation.alphaTarget(0.8).restart();//设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
                    }
                    d.fx = d.x;
                    d.fy = d.y;
                }
                function dragged(d){
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                }
                function ended(d){
                    if(!d3.event.active){
                        forceSimulation.alphaTarget(0);
                    }
                    d.fx = null;
                    d.fy = null;
                }



            }
        }
    }

</script>

<style lang="stylus" scoped>
    .tooltip
        position absolute
        padding 5px
        width 120px
        height auto
        font-family simsun
        font-size 14px
        color black
        background-color rgb(255,255,255)
        border-width 2px solid rgb(255,255,255)
        border-radius 5px
    .tooltip:after{
        content: '';
        position:absolute;
        bottom:100%;
        left:20%;
        margin-left: -8px;
        width:0;
        height:0;
        border-bottom:12px solid rgb(255,255,255);
        border-right:12px solid transparent;
        border-left:12px solid transparent;
    }
</style>
