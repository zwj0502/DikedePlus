<template>
  <div>
    <!-- 头部抽成组件 -->
    <!-- <el-row class="search">
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
    </el-row> -->
    <Search class="search" @SearchFn="SearchUser" />
    <!-- 展示结果 -->
    <el-row class="result">
      <!-- 新建按钮 -->
      <el-button type="primary" class="add" @click="addRole">
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
          <template slot-scope="{row}">
            <el-button type="text" size="14" @click="edit(row)">修改</el-button>
            <el-button type="text" size="14" style="color:red" @click="delUser(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <Paging
        ref="paging"
        :total-page="totalPage"
        :total-count="totalCount"
        :page-index="page.pageIndex"
        @getCarList="refresh"
      />
    </el-row>
    <!-- 弹框组件 -->
    <RoleDialog ref="addRole" :is-show.sync="isShowDialog" @refresh="refresh(page.pageIndex)" />
  </div>
</template>

<script>
import { getUserRoleAPI, searchUserAPI } from '@/api/user'
import { delUserAPI } from '@/api/user'
import Paging from '@/components/Paging/index.vue'
import RoleDialog from './components/roleDialog.vue'
import Search from './components/Search.vue'
export default {
  components: { Paging, RoleDialog, Search },
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      userInfo: {
        userName: '',
        roleId: '',
        isRepair: ''
      },
      totalPage: 0,
      totalCount: 0,
      isShowDialog: false
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
        userName: this.userInfo.userName,
        roleId: this.userInfo.roleId,
        isRepair: this.userInfo.isRepair
      })
      // console.log(data)
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
      this.tableData = data.currentPageRecords
      // 进行判定是否前进一页
      const { currentPageRecords, totalCount } = data
      if (currentPageRecords.length === 0 && totalCount > 0) {
        this.page.pageIndex--
        this.getUserRole()
        this.$refs.paging.isShow = false
      }
    },
    // pageIndex更新后，再发请求，重新渲染
    refresh(pageIndex) {
      // pageIndex进行更新
      // console.log(pageIndex)
      this.page.pageIndex = pageIndex
      this.getUserRole()
      // 页码的isShow改为true
      this.$refs.paging.isShow = true
    },
    // 点击删除功能
    async  delUser(userId) {
      try {
        // 二次确认
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        await delUserAPI(userId)
        this.$message.success('删除成功')
        // 调用刷新功能，更新视图
        this.refresh(this.page.pageIndex)
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    // 点击新增按钮
    addRole() {
      // 点击按钮，更改显示属性
      this.isShowDialog = true
      // 如果先搜再添加，想展示全部数据，就添加这行
      this.userInfo.userName = ''
    },
    // 点击编辑
    edit(row) {
      // console.log(row)
      // 让数据回显并显示弹窗
      this.$refs.addRole.formData = {
        userName: row.userName,
        roleId: row.roleId,
        mobile: row.mobile,
        regionId: row.regionId,
        regionName: row.regionName,
        status: row.status,
        image: row.image
      }
      this.$refs.addRole.id = row.id
      this.isShowDialog = true
    },
    // 点击搜索按钮进行搜索
    async SearchUser(userName) {
      try {
        const { data } = await searchUserAPI(
          {
            userName: userName
          }
        )
        // console.log(data)
        // 把当前列表替换掉
        this.tableData = data.currentPageRecords
        // 把渲染列表的变量用户名更改掉，点下一页就自动是添加要求的了
        this.userInfo.userName = userName
        // 底边页数都同步
        // 如果上面通过，除了数据初始化外，页码也初始化
        this.page.pageIndex = 1
        // 页码的isShow改为true
        this.$refs.paging.isShow = true
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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

 ::v-deep .el-form-item__label  {
      font-weight: 400 !important;
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
