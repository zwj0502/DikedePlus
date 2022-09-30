<template>
  <div>
    <div class="main">
      <el-row>
        <el-col :span="23">合作商点位数Top5</el-col>
        <el-col :span="1"><span class="el-icon-chat-dot-round" /></el-col>
      </el-row>
      <div id="mychart3" class="mycharts" :style="{ width: '476px', height: '278px' }" />
      <div class="mainRight"><p>16</p><p>点位数</p><p>合作商数</p><p>5</p></div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'

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
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: [
              { value: 1048, name: '金燕龙合作商' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart3'))// 图标初始化
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
.main{
    position: relative;
    width: 767px;
    height: 353px;
    background-color: white;
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    .mycharts{
        // margin-top: 30px;
    }
.mainRight{
    position: absolute;
    top: 70px;
    right: 40px;
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

}
</style>
