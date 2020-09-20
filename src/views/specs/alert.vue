<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo">
        <el-form-item label="属性名" label-width="100px">
          <el-input v-model="formInfo.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值" label-width="100px">
          <el-row>
            <el-col style="padding-bottom:10px" :span="20" v-for="(item,idx) in list" :key="idx">
              <el-input style="width:250px" v-model="item.value" autocomplete="off"></el-input>
              <el-button @click="addAttr" v-if="idx<=0" type="success">添加属性</el-button>
              <el-button @click="list.splice(idx,1)" v-else type="warning">删除属性</el-button>
            </el-col>
          </el-row>
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
import { add_specs_list, edit_specs_list } from "@/axios/apis/specs";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  specsname: "",
  id: "",
  attrs: "",
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
      list: [
        {
          value: "",
        },
      ],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      specsList: "specs/specslist",
    }),
  },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
    }),
    //把属性整理成需要的形式
    changeAttr() {
      return this.list
        .map((val) => {
          return val.value;
        })
        .join(",");
    },
    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.formInfo.attrs = this.changeAttr();
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_specs_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.isShow = false;
              this.formInfo = resetForm;
              this.list = [
                {
                  value: "",
                },
              ];
              this.get_specs_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_specs_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.list = [
                {
                  value: "",
                },
              ];
              this.get_specs_list();
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
      this.list = [
        {
          value: "",
        },
      ];
      done();
    },

    //点击取消按钮
    cancle() {
      this.isShow = false;
      this.formInfo = { ...resetForm };
      this.list = [
        {
          value: "",
        },
      ];
    },

    //增加属性值表单
    addAttr() {
      this.list.push({
        value: "",
      });
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped></style>