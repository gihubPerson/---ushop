<template>
  <div class="aside">
    <div class="title">后台系统</div>
    <el-menu
      background-color="#D3DCE6"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router='true'
    >
      <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          后台首页</el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">管理员管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span slot="title">商城管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/category">商品分类</el-menu-item>
          <el-menu-item index="/specs">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped>
.aside {
  width: 200px;
  background-color: #D3DCE6;
  height: 100vh;

  .title {
    font: normal bold 30px / 50px '微软雅黑';
    text-indent: 15px;
    background-color: #B3C0D1;
  }
}

.el-menu-vertical-demo {
  border-right: none;
}

// 列表
.el-menu-item-group {
  .el-menu-item {
    text-indent: 20px;
  }
}
</style>