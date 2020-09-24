<template>
  <div class="aside">
    <div class="title">后台系统</div>
    <el-menu
      background-color="#D3DCE6"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        后台首页
      </el-menu-item>

      <el-submenu v-for="(item,idx) in menus" :key="idx" :index="idx+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(val,i) in item.children" :key="i" :index="val.url">{{val.title}}</el-menu-item>
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
      menus: [],
    };
  },
  mounted() {
    this.menus = JSON.parse(localStorage.getItem("menulist"));
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
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