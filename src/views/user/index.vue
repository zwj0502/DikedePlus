<template>
  <div>
    <!-- 头部 -->
    <el-row class="search">
      <el-form :inline="true">
        <el-form-item label="人员搜索:">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            <span class="el-icon-search" />查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 展示结果 -->
    <el-row class="result">
      <!-- 新建按钮 -->
      <el-button type="primary" class="add">
        <span class="el-icon-circle-plus-outline" />
        <span>新建</span>
      </el-button>
      <!-- 结果表单 -->
      <el-table
        :data="tableData"
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
          width="300"
        />
        <el-table-column
          prop="regionName"
          label="归属区域"
          width="300"
        />
        <el-table-column
          prop="role.roleName"
          label="角色"
          width="300"
        />
        <el-table-column
          prop="mobile"
          label="联系电话"
          width="300"
        />
        <el-table-column
          label="操作"
        >
          <template>
            <el-button type="text" size="14">修改</el-button>
            <el-button type="text" size="14" style="color:red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <Paging
        :total-page="totalPage"
        :total-count="totalCount"
        :page-index="page.pageIndex"
        @getCarList="refresh"
      />
    </el-row>
  </div>
</template>

<script>
import { getUserRoleAPI } from '@/api/user'
import Paging from '@/components/Paging/index.vue'
export default {
  components: { Paging },
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      totalPage: 0,
      totalCount: 0
    }
  },
  created() {
    this.getUserRole()
  },
  methods: {
    // 获取展示列表
    async getUserRole() {
      const { data } = await getUserRoleAPI({
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize,
        userName: '',
        roleId: '',
        isRepair: ''
      })
      console.log(data)
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      this.tableData = data.currentPageRecords
    },
    // pageIndex更新后，再发请求，重新渲染
    refresh(pageIndex) {
      // pageIndex进行更新
      console.log(pageIndex)
      this.page.pageIndex = pageIndex
      this.getUserRole()
    }
  }
}
</script>

<style scoped lang="scss">
  .search {
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
  .el-icon-search {
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
