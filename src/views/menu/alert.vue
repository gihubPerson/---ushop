<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
        <el-form-item label="类型" label-width="100px">
          <el-radio-group v-model="formInfo.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :key="1"
          v-if="formInfo.type == 2"
          label="上级菜单"
          prop="title"
          label-width="100px"
        >
          <el-select v-model="formInfo.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="(item,idx) in menuList"
              :key="idx"
              v-if="item.type == 1"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :key="2"
          :label="formInfo.type == 1? '标题' : '菜单名称'"
          label-width="100px"
          prop="title"
        >
          <el-input v-model="formInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :key="3" label="图标" label-width="100px">
          <el-input v-model="formInfo.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :key="4"
          v-if="formInfo.type == 2"
          label="菜单地址"
          label-width="100px"
          prop="url"
        >
          <el-input v-model="formInfo.url" autocomplete="off"></el-input>
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
import { add_menu_list, edit_menu_list } from "@/axios/apis/menu";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  pid: 0,
  type: 1,
  title: "",
  icon: "",
  url: "",
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
        pid: [{ required: true, message: "请输入上级菜单", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      menuList: "menu/menulist",
    }),
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),

    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_menu_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.isShow = false;
              this.formInfo = resetForm;
              this.get_menu_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_menu_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.get_menu_list();
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