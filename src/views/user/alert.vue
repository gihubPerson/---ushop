<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
        <el-form-item :key="1" label="角色名称" prop="roleid" label-width="100px">
          <el-select v-model="formInfo.roleid">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="(item,idx) in roleList"
              :key="idx"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" label-width="100px" prop="username">
          <el-input v-model="formInfo.username" autocomplete="off" placeholder="请输入管理员名称"></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd" label="管理员密码" label-width="100px" prop="password">
          <el-input
            v-model="formInfo.password"
            prop="password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-else label="管理员密码" label-width="100px">
          <el-input v-model="formInfo.password" autocomplete="off" placeholder="不输入代表不修改"></el-input>
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
import { add_user_list, edit_user_list } from "@/axios/apis/user";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  roleid: 0,
  username: "",
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
      isAdd: true,
      formInfo: {
        ...defaultForm,
      },
      rules: {
        roleid: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.get_role_list();
  },
  computed: {
    ...mapGetters({
      roleList: "role/rolelist",
    }),
  },
  methods: {
    ...mapActions({
      get_user_list: "user/get_user_list",
      get_role_list: "role/get_role_list",
    }),

    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_user_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.isShow = false;
              this.formInfo = resetForm;
              this.get_user_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            console.log();
            //如果是修改
            return
            let res = await edit_user_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.get_user_list();
            } else {
              this.$message.warning(res.msg);
            }
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