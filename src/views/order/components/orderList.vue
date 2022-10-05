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
      prop="orderNo"
      label="订单编号"
      width="230"
    />
    <el-table-column
      prop="skuName"
      label="商品名称"
    />
    <el-table-column
      prop="price"
      label="订单金额"
    />
    <el-table-column
      prop="innerCode"
      label="设备编号"
    />
    <el-table-column
      prop="status"
      label="订单状态"
    />
    <el-table-column
      prop="createTime"
      label="订单日期"
      width="200"
    />
    <el-table-column
      label="操作"
    >
      <template slot-scope="{row}">
        <span style="color:#5f84ff" @click="getRegionaldetails(row)">查看详情</span>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
export default {
  name: 'Levelman',
  components: {
  },
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  }
//   methods: {
//     async getRegionaldetails({ id }) {
//       const { data } = await getdetailsAPI(id)
//       console.log(data)
//       this.statusList = data
//       this.statusList.forEach(item => {
//         if (item.vmStatus === 0) {
//           item.vmStatus = '未投放'
//         } else if (item.vmStatus === 1) {
//           item.vmStatus = '运营'
//         } else if (item.vmStatus === 2) {
//           item.vmStatus = '撤除'
//         }
//       })
//       for (let i = 0; i < this.statusList.length; i++) {
//         this.statusList.lastSupplyTime = this.statusList[i].lastSupplyTime.replace(/T/g, '')
//       }
//       this.visible = true
//     }
//   }
}
</script>

  <style scoped lang="scss">
  span{
    margin-right: 15px;
  }
  </style>

