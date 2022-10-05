<template>
  <div class="app-container">
    <el-card> <div class="search"><span style="margin-right:10px;font-size: 14px;color: #606266;">合作商搜索：</span>
                <input v-model="serachTest" type="text" class="searchinput" placeholder="请输入">
                <el-button type="primary" icon="el-icon-search" @click="searcherBtn">查询</el-button>
              </div>
      <div class="resale">
        <el-button type="warning" icon="el-icon-plus" @click="visible = true">新建</el-button>
        <partnersMain :table-data="tableData" @deleteOk="getLevelManagement" @TheEditorBtn="TheEditorBtn" />
        <!-- <partnersMain v-else :table-data="searchList" @deleteOk="searcherBtn" /> -->
        <!-- 分页组件 -->
        <!-- <Paging v-if="isend" :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getCarList" /> -->
        <newPartners ref="NewRegion" :visible.sync="visible" @postLevelManagement="getLevelManagement" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getpartnersAPI } from '@/api/partners'
// import Paging from '@/components/Paging'
import newPartners from './components/newPartners.vue'
import partnersMain from './components/partnersMain.vue'
export default {
  name: 'Regoin',
  components: {
    // Paging,
    newPartners,
    partnersMain
  },
  data() {
    return {
      serachTest: '',
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      loading: false,
      visible: false,
      searchList: [],
      isMain: true,
      isend: true
    }
  },
  watch: {
    'tableData.length'(val) {
      // console.log(val)
      if (val === 0) {
        this.pageIndex = this.pageIndex - 1
        this.getLevelManagement()
      }
    }
  },
  mounted() {
    this.getLevelManagement()
  },
  methods: {
    async getLevelManagement() {
      try {
        const { data } = await getpartnersAPI({ pageIndex: this.pageIndex, pageSize: this.pageSize })
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

    // async  getCarList(node) {
    //   try {
    //     const { data } = await getpartnersAPI({ pageIndex: node, pageSize: this.pageSize })
    //     // console.log(data.totalPage)
    //     this.loading = true
    //     this.tableData = data.currentPageRecords
    //     this.pageIndex = node
    //   } catch (error) {
    //     this.$message.error('请求失败，刷新一下')
    //   } finally {
    //     this.loading = false
    //   }
    // },
    async searcherBtn() {
      const { data } = await getpartnersAPI({ name: this.serachTest, pageIndex: this.pageIndex, pageSize: this.pageSize })
      this.isMain = false
      this.tableData = data.currentPageRecords
    },
    TheEditorBtn(node) {
      console.log(node)
      this.$refs.NewRegion.formDate = { ...node }
      // console.log(this.$refs.NewRegion.formDate)
      this.visible = true
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

</style>
