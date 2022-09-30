<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imgerror="defaultImg" src="@/assets/imgs/photo.png" class="user-avatar"><span class="userName">{{ userName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <button class="layout" @click="logout">退出</button>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              退出
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import defaultImg from '@/assets/imgs/photo.png'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userName',
      'image'
    ])
  },
  data() {
    return {
      defaultImg: defaultImg
    }
  },
  created() {
    this.$store.dispatch('user/getUserInfo', this.$store.getters.userId)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
 background: url('~@/assets/imgs/headbackground.png') no-repeat;
 background-size: cover;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 60px;
    width: 300px;
    margin-right: 30px;
    .layout{
     position: absolute;
     right: -95px;
     top: 23px;
     font-size: 15px;
      color: #fff;
      background: rgba(0, 0, 0, 0);
      border: none;
    }
     img{
          float: left;
          width: 35px;
          height: 35px;
          margin-right: 20px;
          margin-left: 40px;
        }
        .userName{
          float: right;
          font-size: 16px;
          color: #fff;
          margin-top: 12px;

        }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -110px;
          top: 15px;
          font-size: 15px;
          color: #fff;
        }
      }
    }
  }
}
</style>

