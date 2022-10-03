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
            label="区域名称"
            width="350"
          />
          <el-table-column
            prop="nodeCount"
            label="点位数"
          />
          <el-table-column
            prop="remark"
            label="备注说明"
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
    <Regionaldetails :regionald-name="regionaldName" :visible.sync="visible" :table-data-a="RegionaldetailsData" />
  </div>
</template>

<script>
import { getRegionaldetailsAPI, deleteRegionaldetailsAPI } from '@/api/LevelManagement'
import Regionaldetails from './Regionaldetails.vue'
export default {
  name: 'Regionalde',
  components: { Regionaldetails },
  props: {
    tableData: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      RegionaldetailsData: [],
      regionaldName: ''

    }
  },
  methods: {
    async getRegionaldetails(row) {
      this.regionaldName = row.name
      //   console.log(row)
      const { data } = await getRegionaldetailsAPI({ regionId: row.id })
      this.RegionaldetailsData = data.currentPageRecords
      this.visible = true
    },
    async deleteRegionaldetails(row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRegionaldetailsAPI(row.id)
        //   console.log(row)
        this.$message.success('删除成功')
        this.$emit('deleteOk')
      } catch (error) {
        this.$message.error('区域下存在点位，不可删除')
      }
    },
    TheEditorBtn(row) {
      this.$emit('TheEditorBtn', row)
    }
  }
}
</script>

<style scoped lang="scss">
span{
  margin-right: 15px;
}
</style>
