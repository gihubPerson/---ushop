<template>
  <div>
    <el-container class="wrap">
      <el-aside class="aside" width="200px">
        <my-aside ref="aside"></my-aside>
      </el-aside>

      <el-container class="conr">
        <el-header class="rHead">
          <content-head @toggle='toggle'></content-head>
        </el-header>
        <el-main class="rMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyAside from "./Aside";
import ContentHead from "./contentHead";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
      //head传来的事件控制aside内的折叠收起
      toggle(){
          if(this.$refs.aside.isCollapse){
              this.$refs.aside.isCollapse = false
          }else{
              this.$refs.aside.isCollapse = true
          }

      }
  },
  components: {
    MyAside,
    ContentHead,
  },
};
</script>
<style lang='stylus' scoped>
.wrap {
  display: flex;

  .conr {
    flex: 1;

    .rHead {
      padding: 0 !important;
    }

    .rMain {
        background-color #f0f0f0
        padding 20px
    }
  }
}
</style>