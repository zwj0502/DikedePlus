<template>
  <div>
    <div class="statistics">
      <div class="statisticsTime">
        <span class="statisticsTimeA">工单统计</span>
        <span class="statisticsTimeB">{{ start }}~{{ end }}</span>
      </div>
      <el-row :gutter="20" :get-workorder-list="getWorkorderList">
        <el-col :span="6"><div class="grid-content bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ getWorkorderList.length }}</p>
            <p class="textnumber">工单总数   (个)</p>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ finishCount }}</p>
            <p class="textnumber">完成工单   (个)</p>
          </div>
        </el-col> <el-col :span="6"><div class="grid-content bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ progressCount }}</p>
            <p class="textnumber">进行工单   (个)</p>
          </div>
        </el-col> <el-col :span="6"><div class="grid-content bg-purple" />
          <div class="numbertextnumber">
            <p class="number">{{ cancelCount }}</p>
            <p class="textnumber">取消工单   (个)</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getWorkorderAPI } from '@/api/Customerservice'
export default {
  data() {
    return {
      start: '2000-01-01',
      end: this.$dayjs(new Date().getTime()).format('YYYY-MM-DD'),
      // end: '2022-09-27',
      getWorkorderList: [],
      finishCount: 0,
      progressCount: 0,
      cancelCount: 0
    }
  },
  created() {
    this.getWorkorder()
  },
  methods: {
    async getWorkorder() {
      try {
        const { data } = await getWorkorderAPI(this.start, this.end)
        this.getWorkorderList = data
        // console.log(data)
        this.finishCount = this.getWorkorderList.reduce((pre, cur) => {
          return pre + cur.finishCount
        }, 0)
        this.progressCount = this.getWorkorderList.reduce((pre, cur) => {
          return pre + cur.progressCount
        }, 0)
        this.cancelCount = this.getWorkorderList.reduce((pre, cur) => {
          return pre + cur.cancelCount
        }, 0)
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.statistics{
    // margin-right: 20px;
    padding: 20px;
    height: 166px;
    width: 538px;
    // border: 1px solid #91A7DC;
  // display: inline;
    // background-color: black;
    // background: #e9f3ff;
    background: #e9f3ff url(~@/assets/imgs/gdtj.png) no-repeat ;
    background-image: url(http://likede2-admin.itheima.net/img/task.66b715b7.png);
    // background-image: repe;
    background-position: right 10px center;
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
    color: #072074;
}
.textnumber{
    font-size: 13px;
    color: #91A7DC;
    margin: 2px 0;
}
    }

}
</style>
