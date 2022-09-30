<template>
  <div>
    <div
      id="mychart1"

      class="echart"
      :style="{ width: '476px', height: '278px' }"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { PieChart } from 'echarts/charts'
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent
// } from 'echarts/components'
// import VChart, { THEME_KEY } from 'vue-echarts'

// use([
//   CanvasRenderer,
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent
// ])
export default {
  data() {
    return {
      name: '张雪',
      yData: [6500, 10000] // 纵坐标数据，与横坐标对应
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const option = {
        title: {
          text: '销售额分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['北京平', '霍营街'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'bar',
            barWidth: '10%',
            data: [6500, 1300]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart1'))// 图标初始化
      myChart.setOption(option)// 渲染页面
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .echart{
      margin-left: 40px;
    }
</style>
