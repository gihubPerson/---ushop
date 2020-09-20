<template>
 <div>
<v-charts :options='data1'></v-charts>
</div>
</template>

<script>
let t1data = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      label: {
        formatter: "{b}:{c}({d}%)",
      },
      emphasis: {
        label: {
          show: true,
          // fontSize: '20',
          // fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [
        { value: 335, name: '直接访问',itemStyle:{color:'black'} },
        { value: 310, name: '邮件营销', itemStyle: { color: 'orange' } },
        { value: 234, name: '联盟广告', itemStyle: { color: 'pink' } },
        { value: 135, name: '视频广告', itemStyle: { color: 'blue' } },
        { value: 1548, name: '搜索引擎', itemStyle: { color: 'green' } }
      ],
    },
  ],
};
import ECharts from 'vue-echarts'
import "echarts/lib/chart/pie";
export default {
 data(){
 return{
     data1:t1data
 }
 },
 created(){},
 methods:{},
 components:{
     'v-charts':ECharts
 }
}

</script>
<style scoped>
</style>