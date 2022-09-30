<template>
  <div>
    <div
      id="mychart"
      class="echart"
      :style="{ width: '476px', height: '278px' }"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      name: '张雪',
      yData: [30, 132, 80, 134] // 纵坐标数据，与横坐标对应
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const option = {
        title: {
          text: '销售额趋势图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['星期一', '星期二', '星期三']
        },
        yAxis: {
          type: 'value'
        },

        series: [

          {
            name: '销售额',
            type: 'line',
            stack: 'Total',
            data: [6000, 3400, 1000]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart'))// 图标初始化
      myChart.setOption(option)// 渲染页面
    //   // 随着屏幕大小调节图表
    //   window.addEventListener('resize', () => {
    //     myChart.resize()
    //   })
    }
  }
}
</script>

  <style scoped lang="scss">
    .echart{
      margin-left: 40px;
    }
  </style>

