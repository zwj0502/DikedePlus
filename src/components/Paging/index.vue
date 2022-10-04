<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="14"><span>共{{ totalCount }}条记录</span><span>第{{ pageIndex }}/{{ totalPage }}页</span></el-col>
      <el-col :span="5"><el-button :loading="loading" type="info" plain @click="getCarList(pageIndex-1)">上一页</el-button>
        <el-button v-if="isShow" :loading="loading" type="info" plain @click="getCarList(pageIndex + 1)">下一页</el-button>
        <el-button v-else type="info" plain disabled>下一页</el-button>
      </el-col></el-row>
  </div>
</template>
<script>
export default {
  name: 'Paging',
  props: {
    totalPage: {
      type: [String, Number],
      //   required: true
      default: 0
    },
    totalCount: {
      type: [String, Number],
      //   required: true
      default: 0
    },
    pageIndex: {
      type: [String, Number],
      //   required: true
      default: 0
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShow: true,
      loading: false
    }
  },
  watch: {
    pageIndex: {
      handler(val) {
        // console.log(val)
        if (val === +this.totalPage) {
          this.isShow = false
        }
      }
    }
  },
  methods: {
    getCarList(pageIndex) {
      // console.log(pageIndex)
      try {
        this.loading = true
        this.isShow = true
        if (pageIndex === 0) { // page等于0，表示已是第一页，提示用户已到第一页
          this.$message.error('已经在第一页了')
          return
        }

        // this.$emit('getCarList', pageIndex)
        // 请求数据长度不为10，表示没有数据，提示用户到最后一页
        // this.$message.error('已经在最后一页了')
        // if (this.pageIndex === +this.totalPage) return
        this.$emit('getCarList', pageIndex)
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
