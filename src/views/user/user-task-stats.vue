<template>
  <div>
    <!-- 头部 -->
    <el-row>
      <!-- 左边头部 -->
      <el-col :span="12" class="head">
        <el-row class="bgc1 box">
          <el-row>
            <span class="title">运营人员<span class="em">(当天)</span></span>
          </el-row>
          <el-row class="details">
            <el-col :span="6" :push="2">
              <div class="num">{{ leftHeard.total }}</div>
              <div class="text">工单总数<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ leftHeard.completedTotal }}</div>
              <div class="text">完成工单<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ leftHeard.cancelTotal }}</div>
              <div class="text">拒绝工单<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ leftHeard.workerCount }}</div>
              <div class="text">运营人员数<span class="em">(个)</span></div>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
      <!-- 右边头部 -->
      <el-col :span="12" class="head">
        <el-row class="bgc2 box">
          <el-row>
            <span class="title">运维人员<span class="em">(当天)</span></span>
          </el-row>
          <el-row class="details">
            <el-col :span="6" :push="2">
              <div class="num">{{ rightHeard.total }}</div>
              <div class="text">工单总数<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ rightHeard.completedTotal }}</div>
              <div class="text">完成工单<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ rightHeard.cancelTotal }}</div>
              <div class="text">拒绝工单<span class="em">(个)</span></div>
            </el-col>
            <el-col :span="6" :push="2">
              <div class="num">{{ rightHeard.workerCount }}</div>
              <div class="text">运维人员数<span class="em">(个)</span></div>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <!-- 身体 -->
    <el-row>
      <el-col :span="18" class="myBody">
        <el-row class="box user-task-status">
          <!-- 表格头部 -->
          <div class="bottomTitle">
            <span style="margin-right:auto;fontWeight:600">工单状态</span>
            <div style="margin-right:20px" class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="{disabledDate:dateOptions}"
                @change="result"
              >
                />
              </el-date-picker></div>
            <el-button-group style="margin-left:15px">
              <el-button type="success" size="small" @click="selectWeek">周</el-button>
              <el-button type="primary" size="small" @click="selectMonth">月</el-button>
              <el-button type="warning" size="small" @click="selectYear">年</el-button>
            </el-button-group>
          </div>
          <div class="charts">
            <!-- 显示图形 -->
            <div v-if="showCharts" id="chartsMain" style="width: 1060px;height:460px;" />
            <!-- 显示图片 -->
            <div v-else class="empty">
              <img src="../../assets/imgs/empty.png" alt="">
              <span class="emptyTxt">暂无数据</span>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6" class="myBody">
        <el-row class="box user-task-rank">
          <!-- 头部 -->
          <div class="peopleHeader">
            <span style="fontWeight:600">人效排名&nbsp;&nbsp;(月度)</span>
            <el-select v-model="defaultValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <!-- 选择按钮 -->
          <el-row type="flex" justify="center">
            <div class="checkBtn">
              <span class="item" :class="{'checkedTrue':isChecked}" @click="isChecked = true">运维人员</span>
              <span class="item" :class="{'checkedTrue':!isChecked}" @click="isChecked = false">维修人员</span>
            </div>
          </el-row>
          <div class="charts">
            <!-- 显示数据 -->
            <!-- 显示图片 -->
            <div class="empty">
              <img src="../../assets/imgs/empty.png" alt="">
              <span class="emptyTxt">暂无数据</span>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import * as echarts from 'echarts'
import dayFormat from '@/utils/dayFormat'
import { taskReportInfoAPI } from '@/api/userStats'
import { getRegionAPI } from '@/api/user'
export default {
  name: 'Stats',
  data() {
    return {
      showCharts: false,
      // 控制按钮是否点击上
      isChecked: true,
      // 下拉选项
      options: [],
      value: '',
      value1: [],
      // 头部要渲染的数据
      leftHeard: {},
      rightHeard: {},
      // 是否是运维人员
      isRepair: false,
      // 人效排名时间(右下)
      rankStartTime: '',
      rankEndTime: '',
      defaultValue: ''
    }
  },
  created() {
    this.taskReportInfo()
    this.getRegion()
    this.getRankTime()
  },
  mounted() {
    // 初始化echarts配置
    // this.initEcharts()
    // 默认初始化时选中一天
    this.value1 = []
    const end = new Date()
    const start = new Date().getTime() - 24 * 60 * 60 * 1000
    this.value1.push(start)
    this.value1.push(end)
  },
  methods: {
    /* eslint-disable */
    // initEcharts() {
    // const  option = {
    //   tooltip: {
    //     axisPointer: {
    //       type: 'shadow',
    //       label: {
    //         show: false
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['Growth', 'Budget 2011', 'Budget 2012'],
    //     itemGap: 5
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],//内容
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //       name: '工作量:个',
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '2月20日',
    //       type: 'bar',
    //       data: [3, 4, 5, 4, 3, 6, 8, 1, 3, 6, 1, 3],
    //       itemStyle: {
    //         color: '#8da4fd',
    //         barBorderRadius: [10, 10, 0, 0], 
    //         barWidth: 8
		// 			},
    //     },
    //     {
    //       name: '3月15日',
    //       type: 'bar',
    //       data: [2, 1, 4, 6, 7, 2, 3, 1, 4, 1, 5, 7],
    //       itemStyle: {
    //         color: '#fa6061',
    //         barBorderRadius: [10, 10, 0, 0], 
    //         barWidth: 8
		// 			},
    //     }
    //   ]
    // };
    //   const myChart = echarts.init(document.getElementById('chartsMain'))// 图标初始化
    //   myChart.setOption(option)// 渲染页面
    //   // 随着屏幕大小调节图表
    //   window.addEventListener('resize', () => {
    //     myChart.resize()
    //   })
    // },
    // 利用选中后触发change方法，把最终获取的时间格式化
    result() {
      // console.log(this.value1)
      const startTime = dayFormat.getFormatTimes(this.value1[0])
      console.log(startTime)
      const endTime = dayFormat.getFormatTimes(this.value1[1])
      console.log(endTime)
    },
    // onPick(times) {
    //   // console.log(times)
    //   const minDate = times.minDate
    //   const maxDate = times.maxDate
    //   // 2个都有值再去执行转换函数
    //   if (minDate && maxDate) {
    //     console.log(minDate)
    //     console.log(maxDate)
    //     console.log(this.value1)
    //   }
    // },
    // 获取区域列表做下拉
    async getRegion() {
      // 这里后端做好分页我如何拿所有数据
      const { data } = await getRegionAPI({
        pageIndex: '',
        pageSize: 1000
      })
      console.log(data)
      const option = data.currentPageRecords
      option.unshift({ id: '0', name: '全部' })
      // console.log(option)
      this.options = option
      this.defaultValue = this.options[0].id
      // console.log(this.options)
    },
    // 日期格式的转换方法
    // 获取区域排名的月度时间
    getRankTime() {
      this.rankStartTime = dayFormat.getCurrMonthDay().starttime
      this.rankEndTime = dayFormat.getCurrMonthDay().endtime
    },
    // 初始化获取头部渲染需要的数据
    async taskReportInfo() {
      const startTime = dayFormat.getToday().starttime
      // console.log(startTime)
      const endTime = dayFormat.getToday().endtime
      const { data } = await taskReportInfoAPI(startTime, endTime)
      // console.log(data)
      data.forEach(item => {
        if (item.repair === true) {
          this.rightHeard = item
        } else {
          this.leftHeard = item
        }
      })
    },
    // 选择今天及今天以后的日期
    dateOptions(time) {
      return time.getTime() > Date.now()
    },
    // 点击获取当前周时间
    selectWeek() {
      // console.log('1')
      this.value1 = []
      const weekStart = dayFormat.getCurrWeekDay().starttime
      const weekEnd = new Date()
      this.value1.push(weekStart)
      this.value1.push(weekEnd)
    },
    // 获取当前月
    selectMonth() {
      this.value1 = []
      const MonthStart = dayFormat.getCurrMonthDay().starttime
      const MonthEnd = new Date()
      this.value1.push(MonthStart)
      this.value1.push(MonthEnd)
    },
    // 获取当前年
    selectYear() {
      this.value1 = []
      const YearStart = dayFormat.getCurrentYearDay().starttime
      const YearEnd = new Date()
      this.value1.push(YearStart)
      this.value1.push(YearEnd)
    }
  }
}
</script>

<style scoped lang="scss">

   .head {
     padding-left: 10px;
     padding-right: 10px;
     margin-top: 20px
   }

   .title {
      color:#333;
      font-size:16px;
      font-weight:600;
      margin-bottom: 20px;
      display: inline-block;
   }

   .myBody {
      padding-left: 10px;
      padding-right: 10px;
   }

  .em {
    margin-left: 10px;
  }

  .box {
    height: 166px;
    padding: 20px;
    border-radius: 20px;
  }
  .bgc1 {
    background-color: #eaf3ff;
    background-image: url('~@/assets/imgs/circle.png'), url('~@/assets/imgs/car.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
  }

  .bgc2 {
    background-color: #faefe8;
    background-image: url('~@/assets/imgs/operation.png');
    background-repeat: no-repeat,no-repeat;
    background-position: calc(100% - 12px) 100%;
  }

  .user-task-status{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
  }

  .user-task-rank{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
}

 .details {
   .num {
    font-size: 36px;
    font-weight: 700;
    color: #072074;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
   }

   .text {
    color: #91a7dc;
    font-size: 12px;
    margin-top: 6px;
   }
 }

 .bottomTitle {
  display: flex;
  justify-content: flex-end;
  align-items: center;
 }

 .el-range-editor.el-input__inner {
    width: 230px;
    height: 32px;
    display:flex;
    align-items: center;
    padding: 3px 10px;
}

::v-deep .el-input__icon {
  height: 32px;
  line-height: 32px;
}

::v-deep .el-date-editor .el-range-separator {
  height: 32px;
  line-height: 32px;
}

::v-deep .el-date-editor .el-range-input {
  font-size: 13px;
}

.charts {
  // background-color: orange;
  width: 100%;
  height: 100%;
  margin-top: 20px;
}

.empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .emptyTxt {
    margin-top: 25px;
    color: #20232a;
    font-size: 14px;
  }
}

.peopleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
::v-deep .el-input--suffix .el-input__inner {
    width: 88px;
    height: 32px;
    color: #20232a;
  }
}

.checkBtn {
  width: 177px;
  height: 34px;
  background-color: #f7faff;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 14px;
  color: #9ca3b4;
  cursor: pointer;
}

.item {
  width: 78px;
  height: 25px;
  font-size: 14px;
  color: #9ca3b4;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkedTrue {
  background: #fff;
  -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  border-radius: 7px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

