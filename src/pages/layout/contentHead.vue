<template>
  <div class="title">
    <div class="left">
      <el-button type="primary" size="mini" icon="el-icon-s-fold" @click="toggle"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>{{$route.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        v-if="$route.path == '/index' ? false : true"
        @click="$router.back()"
        size="small"
        icon="el-icon-back"
        circle
      ></el-button>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item> <i class="el-icon-full-screen"></i> 全屏</el-dropdown-item>
        <el-dropdown-item><span @click="exit"><i class="el-icon-switch-button"></i> 退出</span> </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'请登录'
    };
  },
  created() {},
  mounted() {
    this.username = localStorage.getItem('username')
  },
  methods: {
    
      toggle(){
        
          this.$emit('toggle')
      },
      exit(){
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        this.$router.push({
          path:'/login'
        })
      }
  },
  components: {},
};
</script>
<style lang='stylus' scoped>
.title {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 -6px 20px 
  display: flex;
  justify-content: space-between;
  align-items: center;


  .left {
    display: flex;
    justify-content: left;
    align-items: center;

    button {
      margin-left: 5px;
    }

    .el-breadcrumb {
      padding-left: 5px;
    }
  }

  .el-dropdown {
      padding-right 20px
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>