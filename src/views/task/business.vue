<template>
  <div>
    <!-- 搜索框 -->
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工单编号:">
          <el-input ref="input" v-model="formInline.code" placeholder="请输入">
            <template #suffix>
              <span v-if="isShow" class="el-icon-circle-close" @click="formInline.code=''" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="工单状态:">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option label="代办" value="todo" />
            <el-option label="进行" value="being" />
            <el-option label="取消" value="cancel" />
            <el-option label="完成" value="finish" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="order">
      <el-button class="add" icon="el-icon-circle-plus-outline" @click="addBtn">新建</el-button>
      <el-button style="background:#FBF4F0">工单配置</el-button>
      <el-table
        :data="workorder"
        :workorder-time="workorderTime"
      >
        <el-table-column
          fixed
          prop="num"
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
          width="120"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="130"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
          width="130"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单方式"
          width="120"
        />
        <el-table-column
          prop="taskStatus"
          label="工单状态"
          width="140"
        />
        <el-table-column
          prop="userName"
          label="运营人员"
          width="140"
        />
        <el-table-column
          prop="updateTime"
          label="创建日期"
          width="180"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
        >
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="handleClick(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getpage" />

    </div>
    <detail :dialog-visible.sync="dialogVisible" :details="details" />
  </div>
</template>

<script>
// import create from './components/create.vue'
import { getworkOrderAPI, getOrderDetails } from '@/api/task'
import page from '@/components/Paging'
import detail from './components/detail.vue'

export default {
  name: 'Task',
  components: {
    page,
    detail
    // create
  },
  data() {
    return {
      formInline: {
        code: '',
        status: ''
      },
      dialogVisible: false,
      isShow: false,
      workorder: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: '',
      loading: false,
      workorderTime: [],
      details: []

    }
  },
  watch: {
    'formInline.code'(val) {
      if (this.formInline.code === val) {
        this.isShow = true
      }
    }
  },
  created() {
    this.getworkOrder()
  },
  methods: {
    async getworkOrder() {
      const { data } = await getworkOrderAPI({ pageIndex: this.pageIndex, pageSize: this.pageSize })
      this.workorder = data.currentPageRecords
      for (var i = 0; i < this.workorder.length; i++) {
        this.workorder[i].updateTime = this.workorder[i].updateTime.replace(/T/g, ' ')
      }
      // console.log(data.currentPageRecords)
      this.loading = true
      this.totalPage = data.totalPage
      this.tableData = data.currentPageRecords
      this.totalCount = data.totalCount
    },
    async getpage(pageIndex) {
      const { data } = await getworkOrderAPI({ pageIndex: pageIndex, pageSize: this.pageSize })
      this.pageIndex = pageIndex
      this.workorder = data.currentPageRecords
      // console.log(data)
    },
    async handleClick(row) {
      this.dialogVisible = true
      const { data } = await getOrderDetails(row.taskId)
      // console.log(data)
      this.details = data
      for (var i = 0; i < this.details.length; i++) {
        this.details[i].updateTime = this.details[i].updateTime.replace(/T/g, ' ')
        this.details[i].createTime = this.details[i].createTime.replace(/T/g, ' ')
      }
    },
    addBtn() {

    }

  }
}
</script>

  <style scoped>
.form{
  height: 64px;
  background-color: #fff;
  margin: 20px;
 padding: 12px 17px;
}
label{
  font-weight: 400;
}
.order{
  min-height: 673px;
  background-color: #fff;
  margin: 20px;
}
 .add{
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color: #fff;
    font-size: 14px;
    margin: 20px 0 20px 20px;
 }
 .el-icon-circle-plus-outline:before{
  font-size: 16px !important;
  margin:20px;
 }
 .page{
  line-height: 40px;
  font-size: 16px;
  color: #dbdfe5;
 }
  </style>

