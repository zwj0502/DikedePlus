<template>
  <div>
    <el-dialog
      :title="title"
      width="50%"
      :visible.sync="visible"
      :before-close="handleClsoe"
    >
      <el-row>
        <el-col :span="12">合作商名称：{{ rowList.name }}</el-col>
        <el-col :span="12"> 联系人：{{ rowList.comtact }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 联系电话：{{ rowList.mobile }}</el-col>
        <el-col :span="12"> 分成比例：{{ rowList.ratio }}</el-col>
      </el-row>
    </el-dialog></div>
</template>

<script>
export default {
  name: 'Region',
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    rowList: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      title: '合作商详情'
    }
  },

  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

  <style>

  </style>

