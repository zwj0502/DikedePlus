<template>
  <div>
    <div class="statistics">
      <div class="statisticsTime">
        <span class="statisticsTimeA">销售统计</span>
        <span class="statisticsTimeB">{{ start }}~{{ end }}</span>
      </div>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ getWorkorderList.length }}</p>
            <p class="textnumber">订单量   (个)</p>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-contents bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ sum }}</p>
            <p class="textnumber">销售额   (万元)</p>
          </div>
        </el-col></el-row>
    </div>
  </div>
</template>

<script>
import { getamountCollectAPI } from '@/api/Customerservice'
export default {
  data() {
    return {
      start: '2022-09-01',
      end: this.$dayjs(new Date().getTime()).format('YYYY-MM-DD'),
      // end: '2022-09-27',
      getWorkorderList: [],
      sum: 0
    //   finishCount: 0,
    //   progressCount: 0,
    //   cancelCount: 0
    }
  },
  created() {
    this.getWorkorder()
  },
  methods: {
    async getWorkorder() {
      try {
        const { data } = await getamountCollectAPI(1, this.start, this.end)
        this.getWorkorderList = data.series
        this.getWorkorderList.forEach(item => {
          this.sum = Math.round(this.sum + item * 0.0001)
        })
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      }
      // console.log(data.series)
    //   this.finishCount = this.getWorkorderList.reduce((pre, cur) => {
    //     return pre + cur.finishCount
    //   }, 0)
    //   this.progressCount = this.getWorkorderList.reduce((pre, cur) => {
    //     return pre + cur.progressCount
    //   }, 0)
    //   this.cancelCount = this.getWorkorderList.reduce((pre, cur) => {
    //     return pre + cur.cancelCount
    //   }, 0)
    }
  }
}
</script>

  <style scoped lang="scss">
  .statistics{
    //   margin: 20px;
    margin-right: 20px;
      padding: 20px;
      height: 166px;
      width: 454px;
    //   border: 1px solid #91A7DC;

    //   background: url(http://likede2-admin.itheima.net/img/sale.606b0d8c.png)no-repeat;
    background: #fbefe8 url(http://likede2-admin.itheima.net/img/sale.606b0d8c.png) no-repeat calc(100% - 12px) 100%;
    //   background-size: cover;
      border-radius: 20px;
      .statisticsTime{
          height: 18.5px;
          line-height: 18.5px;
          width: 100%;
  .statisticsTimeA{
      font-size: 16px;
      color: black;
      font-weight: 700;
  }
  .statisticsTimeB{
      margin-left: 10px;
      font-size: 12px;
      color: #999;
  }
      }
  }
  .el-col-6 {
      width: 25%;
      height: 122px;
      padding: 0 20px;
      margin-left: 50px;

      /* text-align: center; */
      /* justify-items: center; */
      // display: flex;
      //     justify-content: center;
      //     align-items: center;

      position: relative;
      .numbertextnumber{
          position: absolute;
          top: 30px;
          left: 30px;
          .number{
      margin: 0;
      font-size: 36px;
      font-family: PingFangSC-Semibold,PingFang SC;
      font-weight: 700;
      color: #ff5757;
  }
  .textnumber{
      font-size: 13px;
      color: #ff5757;
      margin: 2px 0;
      width: 80px;

  }
      }

  }
  .grid-contents{
  margin-left: 60px;
}
  </style>

