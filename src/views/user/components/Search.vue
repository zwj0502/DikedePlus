<template>
  <el-row class="search">
    <el-form :inline="true" :model="formData">
      <el-form-item label="人员搜索:">
        <el-input v-model="formData.userName" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SearchUser">
          <span class="el-icon-search" />查询
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userName: ''
      }
    }
  },
  methods: {
    SearchUser() {
      this.$emit('SearchFn', this.formData.userName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
