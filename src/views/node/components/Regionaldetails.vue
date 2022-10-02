<template>
  <div>
    <el-dialog
      :title="title"
      width="50%"
      :visible.sync="visible"
      :before-close="handleClsoe"
    >
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">区域名称：{{ regionaldName }}</el-col>
      </el-row>

      <el-table
        :data="tableDataA"
        style="width: 500px;margin-left: 50px;border:none"
      >
        <el-table-column
          label="包含点位："
          width="100"
        />
        <el-table-column
          type="index"
          label="序号"
          width="120"
          style="border:none"
        />
        <el-table-column
          prop="name"
          label="点位名称"
          width="140"
        />
        <el-table-column
          prop="region.nodeCount"
          label="设备数量"
          width="140"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Region',
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    tableDataA: {
      type: [Object, Array],
      required: true
    },
    regionaldName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '区域详情'
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
