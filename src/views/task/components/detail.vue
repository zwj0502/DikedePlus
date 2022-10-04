<template>
  <div>
    <el-dialog
      title="工单详情"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <div class="top">
        <img src="@/assets/imgs/task-left.png" alt="" class="left">
        <span class="mid">取消</span>
        <img src="@/assets/imgs/task-right.png" alt="" class="right">
      </div>
      <el-row>
        <el-col :span="12">设备编号:  {{ details.innerCode }}</el-col>
        <el-col :span="12">创建日期:  {{ details.createTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">取消日期:  {{ details.updateTime }}</el-col>
        <el-col :span="12">运营人员:  {{ details.userName }}</el-col>
      </el-row>
      <el-row v-if="details">
        <el-col :span="12">工单类型:  {{ details.taskType ? details.taskType.typeName : '' }}</el-col>
        <el-col :span="12">补货数量:  <span style="color:#5f84ff" @click="bhDetail">补货详情</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">工单方式:  {{ details.taskType ? details.taskStatusTypeEntity.statusName :'' }}</el-col>
        <el-col :span="12">取消原因:  </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-right:250px;background-color:#fbf4f0;border:none" @click="create">重新创建</el-button>
      </span>
    </el-dialog>
    <create :is-create.sync="isCreate" :details="details" />
    <bhDetail :isbuhuo.sync="isbuhuo" :bh-details="bhDetails" />
  </div>
</template>

<script>
import { getBhDetails } from '@/api/task'
import create from './create.vue'
import bhDetail from './bhDetail.vue'
export default {
  name: 'Detail',
  components: {
    create,
    bhDetail
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    details: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      isCreate: false,
      isbuhuo: false,
      bhDetails: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    create() {
      this.$emit('update:dialogVisible', false)
      this.isCreate = true
    },
    async bhDetail() {
      const { data } = await getBhDetails(this.details.taskId)
      this.bhDetails = data
      this.isbuhuo = true
    }

  }
}
</script>

<style lang="scss" scoped>
.top{
  width: 590px;
  height: 54px;
background-color: #ececec63;
margin-bottom: 40px;
}
.left{
  position: relative;
  left: 22px;
  top: -25px;
}
.mid{
  position: relative;
  left: 35px;
  top: -32px;

}
.right{
  position: relative;
  right: -420px;
  top: -10px;
}
.el-col-12{
  height: 36px;
  line-height: 36px;
  padding-left: 50px;
}
</style>>
