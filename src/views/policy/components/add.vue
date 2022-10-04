<template>
  <div>
    <el-dialog
      title="新增策略"
      :visible.sync="isAddDialog"
      width="35%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="策略名称" prop="policyName">
          <el-input v-model="ruleForm.policyName" placeholder="请输入" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="策略方案" prop="discount">
          <el-input-number v-model="num" controls-position="right" :min="1" style="width:363px" placeholder="请输入" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button style="background-color:#fbf4f0;border: none">取 消</el-button>
        <el-button type="primary" class="sure" @click="sureBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addPolicy } from '@/api/policy'
export default {
  props: {
    isAddDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        policyName: '',
        discount: ''
      },
      rules: {
        name: [{ required: true, message: '输入框不能为空', trigger: 'blur' }],
        ways: [{ required: true, message: '输入框不能为空', trigger: 'blur' }]
      },
      num: 1,
      loading: false

    }
  },
  methods: {
    handleClose() {
      this.$emit('update:isAddDialog', false)
    },
    async sureBtn() {
      try {
        await addPolicy({ policyName: this.ruleForm.policyName, discount: this.num })
        this.$message.success('新增成功')
        this.$emit('update:isAddDialog', false)

        this.$emit('refreshList')
        this.loading = true
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
.sure{
    background: linear-gradient(135deg,#ff9743,#ff5e20);
    color: #fff;
    margin-right: 160px;
    border: none ;

}
</style>
