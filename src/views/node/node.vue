<template>
  <div class="app-container">
    <el-card>
      <!-- <div class="search"><span style="margin-right:10px;font-size: 14px;color: #606266;">区域搜索：</span>
        <input v-model="serachTest" type="text" class="searchinput" placeholder="请输入">
        <el-button type="primary" icon="el-icon-search" @click="searcherBtn">查询</el-button>
      </div> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="点位搜索">
          <el-input v-model="formInline.name" placeholder="点位搜索" />
        </el-form-item>
        <el-form-item label="区域搜索">
          <el-select v-model="formInline.regionId" placeholder="区域搜索">
            <el-option v-for="item in Theregionallist" :key="item.id" :label="item.name" :value="item.id" />
            <!-- <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" /> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searcherBtn">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="resale">
        <el-button type="warning" icon="el-icon-plus" @click="getNewLevel">新建</el-button>
        <LevelManagement v-if="isMain" :table-data="tableData" @deleteOk="getPointsearch" @TheEditorBtn="TheEditorBtn" />
        <LevelManagement v-else :table-data="searchList" @deleteOk="searcherBtn" />
        <!-- 分页组件 -->
        <Paging v-if="isend" :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getCarList" />
        <NewLevel ref="NewRegion" :partners-list="partnersList" :theregionallist="Theregionallist" :visible.sync="visible" @postLevelManagement="getLevelManagement" />
      </div>
    </el-card>
  </div>
</template>
<script>
import Paging from '@/components/Paging'
import NewLevel from './components/NewLevel.vue'
import LevelManagement from './components/LevelManagement.vue'
import { getPointsearchAPI } from '@/api/point'
import { getLevelManagementAPI } from '@/api/LevelManagement'
import { getpartnersAPI } from '@/api/point'
export default {
  name: 'Node',
  components: {
    Paging,
    NewLevel,
    LevelManagement
  },
  data() {
    return {
      visible: false,
      tableData: [],
      formInline: {
        regionId: '',
        area: ''
      },
      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      loading: false,
      searchList: [],
      isMain: true,
      isend: true,
      Theregionallist: [

      ],
      partnersList: []
    }
  },
  created() {
    this.getPointsearch()
    this.getLevelManagement()
  },
  methods: {
    async getPointsearch() {
      const { data } = await getPointsearchAPI({ pageIndex: this.pageIndex, pageSize: this.pageSize })
      console.log(data)
      this.loading = true
      this.totalPage = data.totalPage
      this.tableData = data.currentPageRecords
      this.totalCount = data.totalCount
    },
    async  getCarList(node) {
      try {
        const { data } = await getPointsearchAPI({ pageIndex: node, pageSize: this.pageSize })
        console.log(node)
        this.loading = true
        this.tableData = data.currentPageRecords
        this.pageIndex = node
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      } finally {
        this.loading = false
      }
    },
    async getLevelManagement() {
      const { data } = await getLevelManagementAPI({ pageSize: 50 })
      console.log(data)
      this.Theregionallist = data.currentPageRecords
    },
    async searcherBtn() {
      const { data } = await getPointsearchAPI(this.formInline)
      console.log(data)
      this.isMain = false
      this.searchList = data.currentPageRecords
      if (data.currentPageRecords.length < 2) {
        this.isend = false
      } else {
        this.isend = true
      }
      // console.log(data)
    },
    async getNewLevel() {
      this.visible = true
      const { data } = await getpartnersAPI({ pageSize: 10 })
      // console.log(data)
      this.partnersList = data.currentPageRecords
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

