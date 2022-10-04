<template>
  <el-dialog width="630px" title="人员详情" :visible="isShowDialog" @close="handleClose">
    <!-- 卡片 -->
    <el-row class="info">
      <el-col :span="8">人员名称：运营沈琪睿</el-col>
      <el-col :span="8">角色：运营员</el-col>
      <el-col :span="8">联系电话:13700000008</el-col>
      <el-col :span="24" class="bottom">负责区域：城北街道</el-col>
    </el-row>
    <!-- 表格 -->
    <template class="userWork">
      <el-table
        v-loading="loading"
        :data="details"
        border
        :center="true"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        :header-cell-style="{background:'#f7f8fd',color:'#606266',fontWeight:400,'text-align':'center'}"
      >
        <el-table-column
          type="index"
          width="116"
        >
          <template slot-scope="{$index}">
            <span v-if="$index === 0">本周</span>
            <span v-if="$index === 1">本月</span>
            <span v-if="$index === 2">本年</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总工单数"
          width="116"
        />
        <el-table-column
          prop="cancelCount"
          label="拒绝工单"
          width="116"
        />
        <el-table-column
          prop="workCount"
          label="完成工单"
          width="116"
        />
        <el-table-column
          prop="progressTotal"
          label="进行中工单"
        />
      </el-table>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: false
    },
    details: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      // 关闭执行表格重置
      this.$emit('update:isShowDialog', false)
      this.$emit('clear', [])
    }
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
   }

  .info {
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;

    .bottom {
      padding-top: 20px;
    }
  }

::v-deep .el-table {
    margin-top: 26px;
  }
</style>
