<template>
  <div>
    <e-charts :options="data1"></e-charts>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
export default {
  data() {
    return {
      data1: {},
    };
  },
  created() {},
  mounted() {
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [],
    };

    setTimeout(() => {
      let res = [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ];
      option.series = res
      this.data1 = option
    }, 500);
  },
  methods: {
    aa() {},
  },
  components: {
    ECharts,
  },
};
</script>
<style scoped>
</style>