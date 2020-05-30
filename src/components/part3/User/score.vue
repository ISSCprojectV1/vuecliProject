<template>
    <div>
        <svg id="t1" width=300 height=300 style="outline: 2px solid red"></svg>
        <svg id="t2" width=300 height=300 style="outline: 2px solid red"></svg>
        <svg id="t3" width=300 height=300 style="outline: 2px solid red"></svg>
        <svg id="t4" width=600 height=600 style="outline: 2px solid red"></svg>
        <span>
        <el-button @click="test">测试1</el-button>
        <el-button @click="test2">测试2</el-button>
        <el-button @click="test3">测试3</el-button>
            <el-button @click="test4">测试4</el-button>

        </span>

    </div>
</template>

<script>
    import * as d3 from 'd3';
    export default {
        name: "score",
        methods:{
            test4(){
                const nodes = [ { name: "桂林" }, { name: "广州" },
                    { name: "厦门" }, { name: "杭州" },
                    { name: "上海" }, { name: "青岛" },
                    { name: "天津" } ];

                const edges = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
                    { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
                    { source : 1 , target: 5 } , { source : 1 , target: 6 } ];
                let svg = d3.select("#t4");
                const width = svg.attr("width");
                const height = svg.attr("height");
                let forceSimulation = d3.forceSimulation()
                    .force("link",d3.forceLink())
                    .force("charge",d3.forceManyBody())
                    .force("center",d3.forceCenter());

                //生成节点数据
                forceSimulation.nodes(nodes)
                    .on("tick",ticked);//这个函数很重要，后面给出具体实现和说明

                //生成边数据
                forceSimulation.force("link")
                    .links(edges)
                    .distance(function(){//每一边的长度
                        return 20;
                    })

                //设置图形的中心位置
                forceSimulation.force("center")
                    .x(width/2)
                    .y(height/2);


                console.log(nodes);
                console.log(edges);
                function ticked(){
                }

            },
            test3() {
                let pie = d3.pie();
                let dataset = [10, 20, 30, 40, 50]
                let piedata = pie(dataset);
                let svg = d3.select("#t3");
                const width = svg.attr("width");

                const outerRadius = 150; //外半径
                const innerRadius = 0; //内半径，为0则中间没有空白
                let arc = d3.arc()  //弧生成器
                    .innerRadius(innerRadius)   //设置内半径
                    .outerRadius(outerRadius);  //设置外半径//const height = svg3.attr("height");

                const colorScale = d3.scaleOrdinal()
                    .domain(d3.range(dataset.length))
                    .range(d3.schemeCategory10);

                let arcs = svg.selectAll("g")
                    .data(piedata)
                    .enter()
                    .append("g")
                    .attr("transform", "translate(" + (width / 2) + "," + (width / 2) + ")");

                arcs.append("path")
                    .attr("fill", function (i) {
                        return colorScale(i);
                    })
                    .attr("d", function (d) {
                        return arc(d);
                    })
                    .on("click", function (d) {
                        console.log(d.data)
                    });

                arcs.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("text-anchor", "middle")
                    .text(function (d) {
                        return d.data;
                    });
            },
            test2() {
                let svg2 = d3.select("#t2")
                svg2.append("rect")
                    .attr("x", "0")
                    .attr("y", "20")
                    .attr("height", "40")
                    .attr("width", "40")
                    .attr("fill", "green")
                    .on("click", function () {
                        console.log("llx")
                    }).on("mouseover", function () {
                    d3.select(this).transition()
                        .duration(1500)
                        .attr("fill", "yellow")
                })
                    .on("mouseout", function () {
                        d3.select(this)
                            .transition()
                            .delay(1000)
                            .duration(1500)
                            .attr("fill", "green")
                    });
            },
            test(){
                const marge = {top:60,bottom:60,left:60,right:60}
                let svg = d3.select("#t1")
                const width = svg.attr("width");
                const height = svg.attr("height");

                let g = svg.append("g")
                    .attr("transform","translate("+marge.top+","+marge.left+")");

                let dataset = [10,20,30,23,40];

                let xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,width-marge.left-marge.right]);

                svg.append("g")
                    .attr("transform","translate(" + marge.left + "," + (height - marge.bottom) + ")")
                    .call(d3.axisBottom(xScale));

                let yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset)])
                    .range([height-marge.top-marge.bottom,0]);

                svg.append("g")
                    .attr("transform","translate(" + marge.left + "," + marge.top + ")")
                    .call(d3.axisLeft(yScale));


                let gs = g.selectAll(".rect")
                    .data(dataset)
                    .enter()
                    .append("g");

                const rectPadding = 20

                gs.append("rect")
                    .attr("x",function(d,i){
                        return xScale(i)+rectPadding/2;
                    })
                    .attr("y",function(){
                        let min = yScale.domain()[0]
                        return yScale(min);
                    })
                    .attr("width",function(){
                        return xScale.step()-rectPadding;
                    })
                    .attr("height",function(){
                        return 0
                    })
                    .attr("fill","blue")
                    .transition()
                    .duration(2000)
                    .delay(function(d,i){
                        return i*400;
                    })
                    .ease(d3.easeElasticInOut)

                    .attr("y",function(d){
                        return yScale(d);
                    })
                    .attr("height",function(d){
                        return height-marge.top-marge.bottom-yScale(d);
                    })



                gs.append("text")
                    .attr("x",function(d,i){
                        return xScale(i)+rectPadding/2;
                    })
                    .attr("y",function(d){
                        return yScale(d);
                    })
                    .attr("dx",function(){
                        (xScale.step()-rectPadding)/2;
                    })
                    .attr("dy",20)
                    .text(function(d){
                        return d;
                    })
            }
    }

    }
</script>

<style scoped>

</style>
