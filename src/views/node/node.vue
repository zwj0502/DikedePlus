<template>
  <div class="app-container">
    <el-card> <div class="search"><span style="margin-right:10px;font-size: 14px;color: #606266;">区域搜索：</span>
                <input v-model="serachTest" type="text" class="searchinput" placeholder="请输入">
                <el-button type="primary" icon="el-icon-search" @click="searcherBtn">查询</el-button>
              </div>
      <div class="resale">
        <el-button type="warning" icon="el-icon-plus" @click="visible = true">新建</el-button>
        <regionMain v-if="isMain" :table-data="tableData" @deleteOk="getLevelManagement" @TheEditorBtn="TheEditorBtn" />
        <regionMain v-else :table-data="searchList" @deleteOk="searcherBtn" />
        <!-- 分页组件 -->
        <Paging v-if="isend" :loading="loading" :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" @getCarList="getCarList" />
        <NewRegion ref="NewRegion" :visible.sync="visible" @postLevelManagement="getLevelManagement" />
      </div>
    </el-card>

  </div>

</template>

<script>
export default {

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

