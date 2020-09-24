<template>
  <div>
    <el-dialog :before-close="beforeClose" title='修改' :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
    
      
        
        <el-form-item label="手机号" label-width="100px" prop='phone'>
          <el-input v-model="formInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
          
        <el-form-item label="昵称" label-width="100px" prop='nickname'>
          <el-input v-model="formInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="formInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="状态" label-width="100px">
          <el-radio-group v-model="formInfo.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label label-width="100px">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add_member_list, edit_member_list } from "@/axios/apis/member";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  uid: 0,
  nickname: '',
  phone: null,
  password: "",
  status: 1,
};
let resetForm = {
  ...defaultForm,
};
export default {
  data() {
    return {
      isShow: false,
      formInfo: {
        ...defaultForm,
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      memberList: "member/memberlist",
    }),
  },
  methods: {
    ...mapActions({
      get_member_list: "member/get_member_list",
    }),

    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //修改
          let newInfo = { ...this.formInfo }
          delete newInfo.addtime
          delete newInfo.id
          delete newInfo.randstr
            let res = await edit_member_list(newInfo);
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.get_member_list();
            } else {
              this.$message.warning(res.msg);
            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //点击x按钮清空内容
    beforeClose(done) {
      this.formInfo = { ...resetForm };
      done();
    },

    //点击取消按钮
    cancle() {
      this.isShow = false;
      this.formInfo = { ...resetForm };
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped></style>