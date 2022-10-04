<template>
  <el-row class="search">
    <el-form :inline="true" :model="formData">
      <el-form-item label="人员搜索:">
        <el-input v-model="formData.userName" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="isShowWork" label="角色">
        <el-select v-model="formData.roleId" placeholder="请选择">
          <el-option label="维修员" :value="3" />
          <el-option label="运营员" :value="2" />
        </el-select>
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
  name: 'SearchHeard',
  props: {
    isShowWork: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        userName: '',
        roleId: null
      }
    }
  },
  methods: {
    SearchUser() {
      // 增加一个判定
      this.isShowWork ? this.$emit('SearchFn', this.formData) : this.$emit('SearchFn', this.formData.userName)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-form--inline .el-form-item__label  {
      font-weight: 400 !important;
  }
</style>
