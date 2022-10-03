<template>
  <div>
    <template>
      <el-dialog
        :title="title"
        width="600px"
        height="300px"
        :visible.sync="visible"
        :before-close="handleClsoe"
      >
        <el-form
          ref="roleDialogForm"
          :model="formDate"
          style="padding:20px 70px"
          label-width="80px"
        >
          <el-form-item
            prop="regionName"
            label="区域名称"
            :rules="[{required:true,message:'名字不能为空',trigger:'blur'}, { min: 1, max: 15, message: '区域名称长度1--15', trigger: 'blur' }]"
          >
            <el-input v-model.trim="formDate.name" />
          </el-form-item>
          <el-form-item
            prop="remark"
            label="备注说明"
            :rules="[{required:true,message:'备注不能为空',trigger:'blur'}, { min: 1, max: 50, message: '备注长度1--50', trigger: 'blur' }]"
          >
            <el-input v-model.trim="formDate.remark" type="textarea" row="3" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
          <el-button @click="handleClsoe">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="getBtn">确 定</el-button>
        </el-row>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { postLevelManagementAPI, TheEditorRegionaldetailsAPI } from '@/api/LevelManagement'
export default {
  name: 'NewRegion',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formDate: {
        name: '',
        remark: ''
      },
      // rules: {
      //   regionName: [
      //     { required: true, message: '区域名称不能为空', trigger: 'blur' }

      //   ],
      //   remark: [{ required: true, message: '备注说明不能为空', trigger: 'blur' }

      //   ]
      // },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formDate = ''
    },
    async getBtn() {
      this.loading = true
      try {
        this.formDate.id ? await TheEditorRegionaldetailsAPI(this.formDate.id, this.formDate) : await postLevelManagementAPI(this.formDate)
        this.$refs.roleDialogForm.resetFields()
        this.$message.success(this.formDate.id ? '编辑成功' : '创建成功')
        this.handleClsoe()
        this.$emit('postLevelManagement')
      } catch (error) {
        this.$message.error('创建失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

  <style scoped lang="scss">

  </style>
