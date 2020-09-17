export function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    //var h = date.getHours() + ':';
    //var m = date.getMinutes() + ':';
    //var s = date.getSeconds();
    return Y + M + D;
}

export function List_timestampToTime(List) {
    for (let item of List)
        item.gmtModified = timestampToTime(item.gmtModified)
}


export function handleTimeFormat(data,key){
    return data.map((element)=>{
        let newObj = {}
        newObj.data = element[key]
        newObj.day = element.day.split("T")[0]
        return newObj
    })
}

export function _handleOption(timexAxis,data){
    let result=new Array(timexAxis.length);
    for(let i=0;i<result.length;i++)
        result[i]="";
    console.log(timexAxis)
    for (let j=0;j<data.length;j++)
    {
        if( timexAxis.indexOf(data[j].day)!=-1)
        {
            result[timexAxis.indexOf(data[j].day)] = data[j].data
        }
    }
    return result;
}

export function handleOption(rawData){
    let timexAxis=[];
    let varDiff=[];
    let varVolatility=[];
    let varPredictVol=[];
    for(let i in rawData)
    {
        for(let j=0;j<rawData[i].length;j++)
            if (!(rawData[i][j].day in timexAxis)){
                timexAxis.push(rawData[i][j].day)
            }
    }
    timexAxis = timexAxis.sort()
    varDiff = _handleOption(timexAxis,rawData['varDiff'])
    varVolatility = _handleOption(timexAxis,rawData['varVolatility'])
    varPredictVol = _handleOption(timexAxis,rawData['varPredictVol'])

    console.log(varDiff)
    console.log(varVolatility)
    console.log(varPredictVol)

    let myoption=  {
        //legend:['Diff','Volatility','PredictVol'],
        legend:['对数收益率','历史收益率波动','预测收益率波动'],
        title:"价格收益率波动率图",
        xAxis:timexAxis,
        data:{
            '对数收益率':varDiff,
            '历史收益率波动':varVolatility,
            '预测收益率波动':varPredictVol
        }
    };
    return myoption
}

export function timeForAuction(time){
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let min = time.getMinutes();
    let s = time.getSeconds();
    let result = y+'-'+m+'-'+d+' '+h+':'+min+':'+s;
    return result;
}
