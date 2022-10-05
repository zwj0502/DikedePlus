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
          label-width="90px"
        >
          <el-form-item
            prop="name"
            label="合作商名称"
            :rules="[{required:true,message:'合作商名称不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.name" />
          </el-form-item>
          <el-form-item
            prop="contact"
            label="联系人"
            :rules="[{required:true,message:'联系人不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.contact" />
          </el-form-item>
          <el-form-item
            prop="mobile"
            label="联系电话"
            :rules="[{required:true,message:'联系电话不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.mobile" />
          </el-form-item>
          <el-form-item
            prop="ratio"
            label="分成比例(%)"
            :rules="[{required:true,message:'分成比例不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.ratio" />
          </el-form-item>
          <el-form-item
            prop="account"
            label="账号"
            :rules="[{required:true,message:'账号不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.account" />
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :rules="[{required:true,message:'密码不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formDate.password" />
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
import { postPartnersAPI, TheEditorPartnersAPI } from '@/api/partners'
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
        contact: '',
        mobile: '',
        ratio: '',
        account: '',
        password: ''
      },
      rules: {
        regionName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '区域名称长度1--15', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '备注说明不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '备注长度1--50', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑合作商' : '新增合作商'
    }
  },
  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
      this.$refs.roleDialogForm.resetFields()
    },
    async getBtn() {
      this.loading = true
      try {
        this.formDate.id ? await TheEditorPartnersAPI(this.formDate.id, this.formDate) : await postPartnersAPI(this.formDate)
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

