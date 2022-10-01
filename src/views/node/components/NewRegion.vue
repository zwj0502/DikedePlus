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
          style="padding:20px 70px"
          label-width="80px"
        >
          <el-form-item
            prop="name"
            label="设备编号: "
          >
            <el-input />
          </el-form-item>
          <el-form-item
            prop="name"
            label="工单类型: "
          >
            <el-input />
          </el-form-item>
          <el-form-item
            prop="name"
            label="运维人员: "
          >
            <el-input />
          </el-form-item>

          <el-form-item label="工单类型: ">
            <el-input type="textarea" row="3" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </el-row>
      </el-dialog>
    </template>
  </div>
</template>

<script>
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
      title: '新增工单'
    }
  },
  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

  <style scoped lang="scss">

  </style>
