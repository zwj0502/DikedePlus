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
    <ItsBetailsVue :table-data-a="statusList" :visible.sync="visible" />
  </div>
</template>

<script>
import { deletePointsearchAPI, getdetailsAPI } from '@/api/point'
import ItsBetailsVue from './ItsBetails.vue'
export default {
  name: 'Levelman',
  components: {
    ItsBetailsVue
  },
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      statusList: []
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
    },
    async getRegionaldetails({ id }) {
      const { data } = await getdetailsAPI(id)
      console.log(data)
      this.statusList = data
      this.statusList.forEach(item => {
        if (item.vmStatus === 0) {
          item.vmStatus = '未投放'
        } else if (item.vmStatus === 1) {
          item.vmStatus = '运营'
        } else if (item.vmStatus === 2) {
          item.vmStatus = '撤除'
        }
      })
      for (let i = 0; i < this.statusList.length; i++) {
        this.statusList.lastSupplyTime = this.statusList[i].lastSupplyTime.replace(/T/g, '')
      }
      this.visible = true
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
