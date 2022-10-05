<template>
  <div class="app-container">
    <el-card>
      <!-- <div class="search"><span style="margin-right:10px;font-size: 14px;color: #606266;">区域搜索：</span>
        <input v-model="serachTest" type="text" class="searchinput" placeholder="请输入">
        <el-button type="primary" icon="el-icon-search" @click="searcherBtn">查询</el-button>
      </div> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="点位搜索">
          <el-input v-model="orderNo" placeholder="点位搜索" />
        </el-form-item>
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searcherBtn">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="resale">
        <orderList :table-data="tableData" />
        <!-- 分页组件 -->
        <Paging v-if="isend" :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getCarList" />
        <!-- <NewLevel ref="NewRegion" :create-user-id="createUserId" :partners-list="partnersList" :theregionallist="Theregionallist" :visible.sync="visible" @postLevelManagement="getPointsearch" /> -->
      </div>
    </el-card>
  </div>
</template>
<script>
import Paging from '@/components/Paging'
import orderList from './components/orderList.vue'
import { getorderAPI } from '@/api/order'

export default {
  name: 'Node',
  components: {
    Paging,
    orderList
  },
  data() {
    return {
      visible: false,
      tableData: [],

      orderNo: '',
      value1: ['2022-01-01T16:00:00.000Z', '2022-10-06T16:00:00.000Z'],

      effectiveDate: '',

      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      loading: false,
      searchList: [],
      isend: true,
      Theregionallist: [
      ],
      partnersList: [],
      createUserId: ''
      // pickerOptions: {
      //   shortcuts: [
      //     {
      //       text: '最近三个月',
      //       onClick(picker) {
      //         const start = new Date()
      //         const end = new Date()
      //         end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
      //         picker.$emit('pick', [start, end])
      //       }
      //     }
      //   ],
      //   disabledDate: time => {
      //     return (
      //       time.getTime() < Date.now() - 8.64e7 ||
      // time.getTime() >
      //   new Date(this.tenantObj.endTime + ' 23:59:59').getTime() - 0
      //     )
      //   }
      // }
    }
  },

  created() {
  //   this.getPointsearch()
    this.getgetorder()
  },
  methods: {
    async getgetorder() {
      try {
        this.loading = true
        const { data } = await getorderAPI({ pageIndex: this.pageIndex, pageSize: this.pageSize })
        console.log(data)
        this.tableData = data.currentPageRecords
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData.createTime = this.tableData[i].createTime.replace(/T/g, '')
        }
        this.tableData.forEach(item => {
          if (item.status === 0) {
            item.status = '未支付'
          } else if (item.status === 2) {
            item.status = '出货成功'
          }
          // item.createTime.replace(/T/g, '')
        })
        this.loading = true
        this.totalPage = data.totalPage
        this.totalCount = data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      } finally {
        this.loading = false
      }
    },
    async  getCarList(node) {
      try {
        const { data } = await getorderAPI({ pageIndex: node, pageSize: this.pageSize })
        // console.log(data.totalPage)
        this.loading = true
        this.tableData = data.currentPageRecords
        this.tableData.forEach(item => {
          if (item.status === 0) {
            item.status = '未支付'
          } else if (item.status === 2) {
            item.status = '出货成功'
          }
        // item.createTime.replace(/T/g, '')
        })
        this.pageIndex = node
      } catch (error) {
        this.$message.error('请求失败，刷新一下')
      } finally {
        this.loading = false
      }
    },
    async searcherBtn() {
      const { data } = await getorderAPI({ orderNo: this.orderNo, startDate: this.value1[0], endDate: this.value1[1] })
      console.log(data)
      this.tableData = data.currentPageRecords
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      if (data.currentPageRecords.length < 2) {
        this.isend = false
      } else {
        this.isend = true
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

  </style>

