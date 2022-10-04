<template>
  <div>
    <Search :is-show-work="isShowWork" @SearchFn="Search" />
    <!-- 列表部分 -->
    <el-row class="result">
      <!-- 结果表单 -->
      <el-table
        :data="workList"
        style="width: 100%;border:none;padding:'2px'"
        :header-cell-style="{background:'#f3f6fb',fontWeight:'normal',color:'#666666'}"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
        />
        <el-table-column
          prop="userName"
          label="人员名称"
          width="210"
        />
        <el-table-column
          prop="roleName"
          label="角色"
          width="206"
        />
        <el-table-column
          prop="mobile"
          label="联系电话"
          width="206"
        />
        <el-table-column
          prop="workCount"
          label="完成工单(本月)"
          width="206"
        />
        <el-table-column
          prop="progressTotal"
          label="进行中工单"
          width="206"
        />
        <el-table-column
          prop="cancelCount"
          label="拒绝工单(本月)"
          width="206"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button type="text" size="14" @click="detail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <Paging
        :total-page="totalPage"
        :total-count="totalCount"
        :page-index="page.pageIndex"
        @getCarList="getNewList"
      />
    </el-row>
    <!-- 弹窗组件 -->
    <detail-list :loading="loading" :is-show-dialog.sync="isShowDialog" :details="details" @clear="clear" />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Paging from '@/components/Paging/index.vue'
import { getWorkListAPI, getWorkDetailsAPI } from '@/api/userWorkList'
import DetailList from './components/detailList.vue'
import dayFormat from '@/utils/dayFormat'
export default {
  components: { Search, Paging, DetailList },
  data() {
    return {
      loading: false,
      isShowWork: true,
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      workList: [],
      // workList: {
      //   userName: '',
      //   mobile: '',
      //   workCount: '',
      //   progressTotal: '',
      //   cancelCount: ''
      // }
      userInfo: {
        userName: '',
        roleId: '',
        isRepair: ''
      },
      totalPage: 0,
      totalCount: 0,
      isShowDialog: false,
      // 点击由作用域插槽拿到这一行数据，把id发请求
      userId: '',
      times: {
        weekTime: '',
        monthTime: '',
        yearTime: ''
      },
      details: []
    }
  },
  created() {
    this.refreshList()
  },
  methods: {
    clear() {
      this.details = []
    },
    // 点击下一页
    getNewList(pageIndex) {
      // 页数更新
      this.page.pageIndex = pageIndex
      // 刷新页面
      this.refreshList()
    },
    // 初始化页面
    async refreshList() {
      const { data } = await getWorkListAPI({
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize,
        userName: this.userInfo.userName,
        roleId: this.userInfo.roleId,
        isRepair: this.userInfo.isRepair
      })
      // console.log(data)
      this.workList = data.currentPageRecords
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
    },
    // 搜索功能
    Search(msg) {
      // console.log(msg)
      // 拿到数据，增添数据再发请求
      // pageIndex重置
      this.page.pageIndex = 1
      this.userInfo.userName = msg.userName
      this.userInfo.roleId = msg.roleId
      this.refreshList()
    },
    // 点击详情，显示弹窗
    detail(row) {
      console.log(row)
      this.userId = row.userId
      // 触发获取事件+发请求方法
      this.detailsTime()
      this.getWorkDetails()
      this.isShowDialog = true
    },
    // 获取当前周月年的开始结束时间
    detailsTime() {
      // 周 返回的是一个对象 {starttime,endtime}
      const weekTime = dayFormat.getCurrWeekDays()
      // console.log(weekTime)
      this.times.weekTime = weekTime
      // 月
      const monthTime = dayFormat.getCurrMonthDays()
      // console.log(monthTime)
      this.times.monthTime = monthTime
      // 年
      const yearTime = dayFormat.getCurrentYearDays()
      // console.log(yearTime)
      this.times.yearTime = yearTime
      // console.log(this.times)
    },
    // 发送请求获取周年月的详细工作情况
    async getWorkDetails() {
      try {
        this.loading = true
        const res1 = await getWorkDetailsAPI({
          userId: this.userId,
          start: this.times.weekTime.starttime,
          end: this.times.weekTime.endtime
        })
        // console.log(res1)
        const res2 = await getWorkDetailsAPI({
          userId: this.userId,
          start: this.times.monthTime.starttime,
          end: this.times.monthTime.endtime
        })
        const res3 = await getWorkDetailsAPI({
          userId: this.userId,
          start: this.times.yearTime.starttime,
          end: this.times.yearTime.endtime
        })
        this.details.push(res1.data)
        this.details.push(res2.data)
        this.details.push(res3.data)
        // console.log(this.details)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .search {
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    ::v-deep .el-icon-search {
    margin-right: 5px;
  }

 ::v-deep .el-form-item__label {
      font-weight: normal;
  }

  ::v-deep .el-input__inner {
    width: 210px;
  }
  .el-form--inline .el-form-item {
    font-weight: normal;
    display: inline-block;
    margin-right: 10px;
    vertical-align: center;
    padding-top: 25px;
  }
}

.el-row.result {
    background-color: #fff;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  .add {
    background-color: #fa7f3a;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    font-size: 14px;
    width: 80px;
    margin-bottom: 20px;
  }
  .el-icon-circle-plus-outline{
    font-size: 14px;
    margin-right: 5px;
  }

  ::v-deep .el-table td,.building-top .el-table th.is-leaf {
    border-bottom:  none;
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}

  ::v-deep .el-table td{
    height: 44px;
    line-height: 44px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-bottom: none;
}

}
</style>

