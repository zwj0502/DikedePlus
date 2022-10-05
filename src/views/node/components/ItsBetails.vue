<template>
  <div>
    <el-dialog
      :title="title"
      width="50%"
      :visible.sync="visible"
      :before-close="handleClsoe"
    >

      <el-table
        :data="tableDataA"
        style="width: 600px;margin-left: 50px;border:none"
      >
        <el-table-column
          type="index"
          label="序号"
          width="120"
          style="border:none"
        />
        <el-table-column
          prop="innerCode"
          label="机器编号"
          width="140"
        />
        <el-table-column
          prop="vmStatus"
          label="设备状态"
          width="140"
        />
        <el-table-column
          prop="lastSupplyTime"
          label="最后一次供货时间"
          width="160"
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
    }
  },
  data() {
    return {
      title: '点位详情'
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
