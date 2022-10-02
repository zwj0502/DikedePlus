<template>
  <el-dialog width="630px" title="新增人员" :visible="isShow" :before-close="handleClose">
    <el-form ref="roleForm" label-width="140px">
      <el-form-item label="人员名称:">
        <el-input placeholder="请输入" maxlength="5" show-word-limit />
      </el-form-item>
      <el-form-item label="角色:">
        <el-select placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input placeholder="请输入" maxlength="11" show-word-limit />
      </el-form-item>
      <el-form-item label="负责区域:">
        <el-select placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <!-- 头像 -->
      <el-form-item label="头像:">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload" />
          <div slot="tip" class="el-upload__tip">支持扩展名:jpg、png,文件不得大于100kb</div>
        </el-upload>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态:">
        <el-checkbox>是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <div slot="footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: true
    }
  },
  methods: {
    handleClose() {
      this.isShow = false
      this.$emit('update:isShow', false)
      // 重置表单
      this.$refs.roleForm.resetField()
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
</style>
