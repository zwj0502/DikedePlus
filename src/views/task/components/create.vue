<template>
  <div>
    <el-dialog
      title="新增工单"
      :visible.sync="isCreate"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="details" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备编号：" prop="code">
          <el-input v-model="details.innerCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工单类型：" prop="type">
          <el-input v-model="details.taskType['typeName']" autocomplete="off" />
        </el-form-item>
        <div class="bhNum">
          补货数量： <span class="el-icon-document">补货清单</span>
        </div>
        <el-form-item label="运营人员：" prop="user">
          <el-input v-model="details.userName" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="ruleForm.beizhu" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancal" @click="isCreate = false">取 消</el-button>
        <el-button type="primary" class="sure" @click="isCreate = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isCreate: {
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
      ruleForm: {
        code: '',
        type: '',
        user: '',
        beizhu: ''
      },
      rules: {
        code: [
          { required: true }
        ],
        type: [
          { required: true }
        ],
        user: [
          { required: true }
        ],
        beizhu: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('updata:isCreate', false)
    }
  }
}
</script>

<style scoped lang='scss'>
.bhNum {
    width: 396px;
    height: 36px;
    line-height: 36px;
    margin: 20px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    span{
        font-weight: 400;
        color: #5f84ff;
    }
}
.cancal{
    border: none;
    background-color:#fbf4f0
}
.sure{
     background: linear-gradient(135deg,#ff9743,#ff5e20);
    border: none;
margin-right: 250px;
}
</style>
