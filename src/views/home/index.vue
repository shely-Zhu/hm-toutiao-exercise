<template>
  <el-container class="my-index">
    <el-aside :width="isCollapse?'60px':'200px'">
      <div class="my-logo"
           :class="{miniLogo:isCollapse}"></div>
      <el-menu :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#002033"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="isCollapse"
               :collapse-transition="false"
               router>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/assets">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comments">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold"
              @click="checkCol"></span>
        <span class="text">江苏传智博客科技有限公司</span>
        <el-dropdown class="my-dropDown" @command="clickMenu">
          <span class="el-dropdown-link">
            <img :src="photo"
                 alt="">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="setting">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    this.name = store.getUser().name
    this.photo = store.getUser().photo
  },
  methods: {
    checkCol () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.cleanUser()
      this.$router.push({ name: '/login' })
    },
    clickMenu (menuType) {
      this[menuType]()
    }
  }
}
</script>
<style lang="less" scoped>
.my-index {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      vertical-align: middle;
      font-size: 24px;
      margin-right: 10px;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .my-dropDown {
      cursor: pointer;
      float: right;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .el-dropdown-link {
        font-weight: 700;
      }
    }
  }
}
.my-logo {
  height: 60px;
  width: 100%;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
}
.el-menu-vertical-demo {
  background: #002233;
  border-right: none;
  transform: none;
}
.miniLogo {
  background: url(../../assets/images/logo_admin_01.png) no-repeat center / 36px
    auto;
}
</style>
