<template>
  <div> <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label="序号"
      width="100"
    />
    <el-table-column
      prop="name"
      label="点位名称"
    />
    <el-table-column
      prop="addr"
      label="所在区域"
    />
    <el-table-column
      prop="businessType.name"
      label="商圈类型"
    />
    <el-table-column
      prop="ownerName"
      label="合作商"
    />
    <el-table-column
      prop="addr"
      label="详细地址"
    />
    <el-table-column
      label="操作"
    >
      <template slot-scope="{row}">
        <span style="color:#5f84ff" @click="getRegionaldetails(row)">查看详情</span>
        <span style="color:#5f84ff" @click="TheEditorBtn(row)">编辑</span>
        <span @click="deleteRegionaldetails(row)">删除</span>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
import { deletePointsearchAPI } from '@/api/point'
export default {
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    async deleteRegionaldetails(row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deletePointsearchAPI(row.id)
        //   console.log(row)
        this.$message.success('删除成功')
        this.$emit('deleteOk')
      } catch (error) {
        this.$message.error('删除失败')
        // if (error.status === 500) {
        //   this.$message.error('不可删除')
        // }
      }
    }
  }
}
</script>

<style scoped lang="scss">
span{
  margin-right: 15px;
}
</style>
