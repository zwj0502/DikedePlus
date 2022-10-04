<template>
  <div>
    <el-dialog
      title="补货详情"
      :visible.sync="isbuhuo"
      width="45%"
      height="250"
      :before-close="handleClose"
    >
      <el-table
        :data="bhDetails"
        height="400"
        style="width: 100%"
      >
        <el-table-column
          prop="channelCode"
          label="货道编号"
          width="190"
        />
        <el-table-column
          prop="skuName"
          label="商品"
          width="200"
        />
        <el-table-column
          prop="expectCapacity"
          label="补货数量"
          width="200"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isbuhuo: {
      type: Boolean,
      default: false
    },
    bhDetails: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
    //   this.isbuhuo = false
      this.$emit('update:isbuhuo', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

