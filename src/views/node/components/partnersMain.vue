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
            label="合作商名称"
            width="150"
          />
          <el-table-column
            prop="account"
            label="账号"
            width="150"
          />
          <el-table-column
            prop="vmCount"
            label="设备数量"
            width="150"
          />
          <el-table-column
            prop="ratio"
            label="分成比例/%"
            width="150"
          />
          <el-table-column
            prop="mobile"
            label="联系人"
            width="150"
          />
          <el-table-column
            prop="account"
            label="联系电话"
            width="150"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="{row}">
              <span style="color:#5f84ff" @click="passworBtn(row.id)">重置密码</span>

              <span style="color:#5f84ff" @click="getRegionaldetails(row)">查看详情</span>
              <span style="color:#5f84ff" @click="TheEditorBtn(row)">编辑</span>
              <span @click="deleteRegionaldetails(row)">删除</span>
            </template>
          </el-table-column>

        </el-table>
    <DetailsofPartners :row-list="rowList" :visible.sync="visible" />
  </div>
</template>

<script>
// import { deletePartnersAPI } from '@/api/LevelManagement'
import { getpasswordAPI, deletePartnersAPI } from '@/api/partners'
import DetailsofPartners from './DetailsofPartners.vue'
export default {
  name: 'Regionalde',
  components: { DetailsofPartners },
  props: {
    tableData: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      rowList: []
    }
  },
  methods: {
    async getRegionaldetails(row) {
      // this.regionaldName = row.name
      console.log(row)
      this.rowList = row
      // const { data } = await getRegionaldetailsAPI({ regionId: row.id })
      // this.RegionaldetailsData = data.currentPageRecords
      this.visible = true
    },
    async deleteRegionaldetails(row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deletePartnersAPI(row.id)
        //   console.log(row)
        this.$message.success('删除成功')
        this.$emit('deleteOk')
      } catch (error) {
        this.$message.error('区域下存在点位，不可删除')
      }
    },
    TheEditorBtn(row) {
      this.$emit('TheEditorBtn', row)
    },
    async passworBtn(id) {
      try {
        await this.$confirm('此操作将重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await getpasswordAPI(id)
        //   console.log(row)
        this.$message.success('重置成功成功')
      } catch (error) {
        this.$message.error(error)
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

