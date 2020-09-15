<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
        <el-form-item label="角色名称" label-width="100px" prop="rolename">
          <el-input v-model="formInfo.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限" label-width="100px">
          <el-tree
          ref='tree'
            :data="menuList"
            show-checkbox
            node-key="id"
            :check-strictly='isChecked'
            :props="{
              children: 'children',
              label: 'title'
        }"
          ></el-tree>
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
import { add_role_list, edit_role_list } from "@/axios/apis/role";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  id: 1,
  menus: [],
  rolename: "",
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
      //权限树是否不遵循父子关系
      isChecked:false,
      formInfo: {
        ...defaultForm,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (!this.menuList.length) {
      this.get_menu_list();
    }

  },
  computed: {
    ...mapGetters({
      roleList: "role/rolelist",
      menuList: "menu/menulist",
    }),
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_menu_list:'menu/get_menu_list'
    }),

    //给表单赋值数据
    setinfo(data){
      this.formInfo = data
        this.isChecked = true
          //  把权限数组设置仅权限树
          //等加载完成打开权限树的父子关系
          this.$nextTick(()=>{
          this.$refs.tree.setCheckedKeys(this.formInfo.menus)
            this.isChecked = false
          })
    },

    //点击确定按钮
    submit() {
      //把选中的节点处理成字符串赋给表单的menus
      this.formInfo.menus = [...this.$refs.tree.getHalfCheckedKeys(),...this.$refs.tree.getCheckedKeys()].join(',')

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_role_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.isShow = false;
              this.formInfo = resetForm;
              this.$refs.tree.setCheckedKeys([])
              this.get_role_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_role_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.$refs.tree.setCheckedKeys([])
              this.get_role_list();
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
      this.$refs.tree.setCheckedKeys([])
      done();
    },

    //点击取消按钮
    cancle() {
      this.formInfo = { ...resetForm };
      this.$refs.tree.setCheckedKeys([])
      this.isShow = false;
    },
  },

  watch: {
  },
  components: {},
};
</script>
<style lang='stylus' scoped></style>