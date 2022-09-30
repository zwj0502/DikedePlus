<template>
  <div class="textClass">
    <div class="statisticsTime">
      <span class="statisticsTimeA">商品热榜</span>
      <span class="statisticsTimeB">{{ start }} ~ {{ end }}</span>
    </div>
    <el-row v-for="(item,index) in getWorkorderList" :key="index" :loading="loading" :gutter="20" class="elrows">
      <el-col :span="3">{{ index +1 }}</el-col>
      <el-col :span="14">{{ item.skuName }}</el-col>
      <el-col :span="7">{{ item.count }}单</el-col>
    </el-row>
  </div>
</template>

<script>
import { ListofgoodshotAPI } from '@/api/Customerservice.js'
export default {
  data() {
    return {
      start: '2000-01-01',
      end: this.$dayjs(new Date().getTime()).format('YYYY-MM-DD'),
      // end: '2022-09-27',
      getWorkorderList: [],
      loading: false

    }
  },
  created() {
    this.Listofgoodshot()
  },
  methods: {
    async Listofgoodshot() {
      try {
        this.loading = true
        const { data } = await ListofgoodshotAPI(10, this.start, this.end)
        //   console.log(data)
        this.getWorkorderList = data
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.textClass{
    width: 317px;
    height: 538px;
    background-color: white;
    padding: 20px;
    .elrows{
        margin-bottom: 30px;
    }
}
.statisticsTime{
    margin-bottom: 20px;
  height: 16px;
  .statisticsTimeA{
    font-size: 16px;
    color: black;
    font-weight: 700;
}
.statisticsTimeB{
    margin-left: 15px;
    font-size: 12px;
    color: #999;
}}

</style>
