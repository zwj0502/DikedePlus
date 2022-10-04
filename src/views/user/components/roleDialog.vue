<template>
  <el-dialog width="630px" :title="id?'编辑角色':'增加角色'" :visible="isShow" :before-close="handleClose">
    <el-form ref="rulesForm" label-width="140px" :model="formData" :rules="rules">
      <el-form-item label="人员名称:" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入" maxlength="5" show-word-limit />
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select v-model="formData.roleId" placeholder="请选择">
          <el-option label="维修员" :value="3" />
          <el-option label="运营员" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入" maxlength="11" show-word-limit />
      </el-form-item>
      <el-form-item label="负责区域:" prop="regionName">
        <el-select v-model="formData.regionName" placeholder="请选择" value-key="id" @change="pushObj">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 头像 -->
      <el-form-item label="头像:" prop="image">
        <el-upload
          v-model="formData.image"
          class="upload-demo"
          drag
          action="#"
          :http-request="UploadPic"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar">
          <i v-else class="el-icon-upload" />
          <div slot="tip" class="el-upload__tip">支持扩展名:jpg、png,文件不得大于100kb</div>
        </el-upload>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态:">
        <el-checkbox v-model="formData.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <div slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRegionAPI, addUserAPI, editUserAPI } from '@/api/user'
import { upImageAPI } from '@/api/fileUpload'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    // 定义手机号码的验证
    const mobileCheck = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      // 根据id是否有值判断标题
      id: null,
      loading: false,
      options: [],
      formData: {
        id: null,
        userName: '',
        roleId: '',
        mobile: '',
        regionId: null,
        regionName: '',
        status: false,
        image: ''
        // image: 'http://destiny001.gitee.io/image/cxk.gif'
      },
      rules: {
        userName: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: mobileCheck, trigger: 'blur' }
        ],
        // regionId: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        regionName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传' }
        ]
      }
    }
  },
  created() {
    this.getRegion()
  },
  methods: {
    pushObj(val) {
      // console.log(val)
      this.formData.regionId = val.id
      this.formData.regionName = val.name
    },
    // 获取区域列表做下拉
    async getRegion() {
      // 这里后端做好分页我如何拿所有数据
      const { data } = await getRegionAPI({
        pageIndex: '',
        pageSize: 1000
      })
      this.options = data.currentPageRecords
      // console.log(this.options)
    },
    // 下拉加载更多
    // 关闭表单
    handleClose() {
      // this.isShow = false
      this.$emit('update:isShow', false)
      // 重置表单
      this.$refs.rulesForm.resetFields()
      // 把控制发哪种请求的开关也重置一下
      this.id = null
      this.formData = {}
    },
    // 表单提交时先验证是否通过
    // value 返回的是布尔值 true和false
    async onSubmit() {
      try {
        // 表单校验通过，再发请求
        await this.$refs.rulesForm.validate()
        // console.log(this.formData)
        this.id ? await editUserAPI(+this.id, this.formData) : await addUserAPI(this.formData)
        // 提示
        this.$message.success(`${this.id ? '编辑' : '增加'}角色成功`)
        // 主页刷新
        this.$emit('refresh')
        // 关闭重置
        this.handleClose()
        this.loading = true
        // console.log(
        //   this.formData
        // )
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    // 头像的上传
    async UploadPic(file) {
      var formData = new FormData()
      formData.append('fileName', file.file)
      const { data } = await upImageAPI(formData)
      this.formData.image = data
    },
    // 上传头像前的过滤
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = (file.size / 1024 / 1024) < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep .el-dialog .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
}

::v-deep .el-dialog__title {
    font-weight: 800;
}

::v-deep .el-form-item__label {
    height: 36px;
    font-weight: normal;
  }

::v-deep .el-input__inner {
    width: 396px;
    padding: 0,15px,0;
    height: 36px;
  }

::v-deep .el-dialog__footer  {
    text-align: center;
  }

::v-deep .el-button {
    width: 80px;
    height: 36px;
    border: 1px solid #ccc;
}

.el-button--primary {
    background-color: #fb8b41;
}

::v-deep .el-upload-dragger {
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    color: #bac0cd;
}

::v-deep .el-upload-dragger .el-icon-upload {
    width: 16px;
    height: 16px;
    font-size: 16px;
    margin-top: 20px;
}

.el-upload__tip {
    font-size: 14px;
    color: #bac0cd;
    height: 16px;
    line-height: 16px;

}

::v-deep .el-input .el-input__count .el-input__count-inner {
    position: absolute;
    width: 50px;
    right: 50px;
    background: #FFF;
    line-height: initial;
    display: inline-block;
    padding: 0 5px;
}

.avatar {
    width: 84px;
    background: no-repeat;
}
</style>
