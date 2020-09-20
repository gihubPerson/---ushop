<template>
  <div class="wrap">
    <div class="inner">
      <div style="color:#fff" class="title">登录</div>
      <hr />
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="forminfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="login" type="primary" style="width:90%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {toLogin} from '../../axios/apis/login'
export default {
  data() {
    return {
      userInfo: {
          username:'aaa',
          password:'aaa'
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
    async login() {
      let res = await toLogin(this.userInfo)
      if(res.code == 200){
        localStorage.setItem("token", JSON.stringify(res.list.token));
        localStorage.setItem("username", res.list.username);
          this.$router.replace({
            path: this.$route.query.towhere || "/index",
          });
      }
    },
  },
  components: {
  },
};
</script>
<style lang='stylus' scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  // background-color: #f0f0f0;
  background-image url('../../assets/imgs/loginbg.jpg')
  background-size 100% 100%
  // background-repeat:no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 500px;
    height: 300px;
    background-color: #061632;
    opacity 0.7
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