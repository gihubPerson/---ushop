<template>
  <div class="wrap">
    <div class="inner">
      <div class="title">登录</div>
      <hr />
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="forminfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="login" type="primary" style="width:90%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
          username:'',
          password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
    };
  },
  created() {},
  methods: {
    login() {
      if ((this.userInfo.username != "") & (this.userInfo.password != "")) {
        //token获取成功
        if (true) {
          localStorage.setItem("userinfo", JSON.stringify(this.userInfo));
          this.$router.replace({
            path: this.$route.query.towhere || "/index",
          });
        }
      }
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    width: 500px;
    height: 300px;
    background-color: #ff;
    border-radius: 20px;
    .title{
      height 50px
      text-align center
      font normal bold 30px/50px "微软雅黑"
    }
    .demo-ruleForm{
      padding 20px
    }
  }
}
</style>