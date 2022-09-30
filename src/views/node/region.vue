<template>
  <div class="app-container">
    <div class="search"><span style="margin-right:10px;font-size: 14px;color: #606266;">区域搜索：</span>
      <input v-model="serachTest" type="text" class="searchinput" placeholder="请输入">
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <div class="resale">
      <el-button type="warning" icon="el-icon-plus">新建</el-button>
      <el-table
        :loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="区域名称"
          width="350"
        />
        <el-table-column
          prop="nodeCount"
          label="点位数"
        />
        <el-table-column
          prop="remark"

          label="备注说明"
        />
        <el-table-column
          label="操作"
        >
          <span>查看详情</span>
          <span>编辑</span>
          <span>删除</span>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Paging :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getCarList" />
    </div>

  </div>
</template>

<script>
import { getLevelManagementAPI } from '@/api/LevelManagement'
import Paging from '@/components/Paging'

export default {
  name: 'Regoin',
  components: {
    Paging
  },
  data() {
    return {
      serachTest: '',
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      loading: false
    }
  },
  mounted() {
    this.getLevelManagement()
  },
  methods: {
    async getLevelManagement() {
      try {
        const { data } = await getLevelManagementAPI({ pageIndex: this.pageIndex, pageSize: this.pageSize })
        console.log(data)
        this.loading = true
        this.totalPage = data.totalPage
        this.tableData = data.currentPageRecords
        this.totalCount = data.totalCount
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      } finally {
        this.loading = false
      }
    },

    async  getCarList(node) {
      try {
        const { data } = await getLevelManagementAPI({ pageIndex: node, pageSize: this.pageSize })
        console.log(data.totalPage)
        this.loading = true
        this.tableData = data.currentPageRecords
        this.pageIndex = node
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
.search{
  padding: 17px;
  height: 64px;
  background-color: white;

}
.searchinput{
    width: 205px;
    height: 36px;
    padding-left:10px ;
    border: 1px solid #d8dde3;
    font-size: 14px;
    border-radius: 5px;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    height: 36px;
    margin-left: 10px;
}
.resale{
  margin-top: 20px;
  background-color: white;
  padding: 17px;
}
span{
  margin-right: 15px;
}
</style>
