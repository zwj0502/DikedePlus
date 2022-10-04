<template>
  <div>
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="策略搜索:">
          <el-input ref="input" v-model="formInline.celve" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-button class="add" icon="el-icon-circle-plus-outline" @click="addBtn">新建</el-button>
      <template>
        <el-table
          :data="policy"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            prop="policyName"
            label="策略名称"
            width="300"
          />
          <el-table-column
            prop="discount"
            label="策略方案"
            width="300"
          />
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="300"
          />
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <page class="page" :page-index="pageIndex" :total-page="totalPage" :total-count="totalCount" @getCarList="getCarList" />
    </div>
    <add :is-add-dialog.sync="isAddDialog" @refreshList="getpolicy()" />
    <detail />
  </div>
</template>

<script>
import detail from './components/details.vue'
import page from '@/components/Paging'
import { getpolicy } from '@/api/policy'
import add from './components/add.vue'
export default {
  name: 'Policy',
  components: {
    add,
    page,
    detail
  },
  data() {
    return {
      formInline: {
        celve: ''
      },
      policy: [],
      isAddDialog: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: '',
      totalCount: ''
    }
  },
  created() {
    this.getpolicy()
  },
  methods: {
    handleClick(row) {

    },
    async  getpolicy() {
      const { data } = await getpolicy({ pageIndex: this.pageIndex, totalCount: this.totalCount })
      this.policy = data.currentPageRecords
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      for (var i = 0; i < this.policy.length; i++) {
        this.policy[i].createTime = this.policy[i].createTime.replace(/T/g, ' ')
      }
    },
    addBtn() {
      this.isAddDialog = true
    },
    async getCarList(node) {
      const { data } = await getpolicy({ pageIndex: node, totalCount: this.totalCount })
      this.policy = data.currentPageRecords
      this.pageIndex = node
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  height: 64px;
  background-color: #fff;
  margin: 20px;
  padding-top: 12px;
  padding-left: 20px;
}
.table{
  min-height: 600px;
  background-color: #fff;
  margin: 20px;
  padding: 20px;
  .add{
  background: linear-gradient(135deg,#ff9743,#ff5e20);
  border: none;
  color: #fff;
  }

}
.page{
  margin-top: 20px;
  color: #cecece;
}
</style>
