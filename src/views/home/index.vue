<template>
  <div class="dashboard-container">
    <!-- <v-chart class="chart" :option="option" /> -->
    <el-row class="harend">
      <el-col :span="13.5">    <Tstatistics />
      </el-col>
      <el-col style="margin-left:20px" :span="10">    <Salesttatistics />
      </el-col>
    </el-row>
    <el-row class="main">
      <div class="statisticsTime">
        <span class="statisticsTimeA">销售数据</span>
        <span class="statisticsTimeB">{{ start }}~{{ end }}</span>
      </div>
      <el-col :span="12"><Thesalesdata /></el-col>
      <el-col :span="12"><Thesalesfenbu /></el-col>
    </el-row>
    <Listofgoodshot class="Listofgoodshot" />
    <partners />
    <abnormal />
  </div>
</template>

<script>
import Tstatistics from './components/Tstatistics.vue'
import Salesttatistics from './components/Salesttatistics.vue'
import Thesalesfenbu from './components/Thesalesfenbu.vue'
import Thesalesdata from './components/Thesalesdata.vue'
import Listofgoodshot from './components/Listofgoodshot.vue'
import partners from './components/partners.vue'
import abnormal from './components/abnormal.vue'
export default {
  name: 'HelloWorld',
  components: {
    Tstatistics,
    Salesttatistics,
    Thesalesfenbu,
    Thesalesdata,
    Listofgoodshot,
    partners,
    abnormal

  },
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
  }
}
</script>

<style scoped lang="scss">
  .dashboard-container{
    position: relative;
    width: 1370px;
    height: 951px;
.harend{
  margin: 20px;
  width: 1011px;
  height: 166px;
  /* padding: 20px; */
  padding-right: 20px;
  background-color: white;
}
.main{
width: 1011px;
height: 352px;
margin-left: 20px;
background-color: white;
border-radius: 20px;
}
.statisticsTime{
  height: 34px;
  line-height: 34px;
  margin-left: 20px;
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
.el-col-12 {
    width: 478px;
}
.Listofgoodshot{
  position: absolute;
  top: 0px;
  right: 10px;
  border-radius: 20px;
}}
</style>
