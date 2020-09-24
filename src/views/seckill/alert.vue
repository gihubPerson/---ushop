<template>
  <div>
    <el-dialog
      :before-close="beforeClose"
      :title="isAdd ? '增加' : '修改'"
      :visible.sync="isShow"
    >
      <el-form ref="form" :model="formInfo" :rules="rules">
        <el-form-item label="活动名称" label-width="100px" prop="title">
          <el-input v-model="formInfo.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" label-width="100px">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            @change="timeChange"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="100px" prop="first_cateid">
          <el-select v-model="formInfo.first_cateid">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, idx) in catelist"
              :key="idx"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px" prop="second_cateid">
          <el-select
            :disabled="secondCateList.length == 0 ? true : false"
            v-model="formInfo.second_cateid"
          >
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, idx) in secondCateList"
              :key="idx"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" label-width="100px" prop="goodsid">
          <el-select
            :disabled="goodsList.length == 0 ? true : false"
            v-model="formInfo.goodsid"
          >
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, idx) in goodsList"
              :key="idx"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { add_seck_list, edit_seck_list } from "@/axios/apis/seck";
import { get_goods_list } from "@/axios/apis/goods";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  first_cateid: -1,
  second_cateid: -1,
  title: "",
  begintime: "",
  endtime: "",
  goodsid: "",
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
      //二级分类列表
      secondCateList: [],
      //商品列表
      goodsList: [],
      formInfo: {
        ...defaultForm,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goodsid: [{ required: true, message: "请选择商品", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      //时间
      time: [],
    };
  },

  created() {},
  mounted() {
    if (!this.seckList.length) {
      this.get_seck_list();
    }
    if (!this.catelist.length) {
      this.get_cate_list();
    }
  },
  computed: {
    ...mapGetters({
      seckList: "seck/secklist",
      catelist: "cate/catelist",
    }),
  },
  methods: {
    ...mapActions({
      get_seck_list: "seck/get_seck_list",
      get_cate_list: "cate/get_cate_list",
    }),

    //给表单赋值数据
    setinfo(data) {
      this.formInfo = data;
    },

    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_seck_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.cancle();
              this.get_seck_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_seck_list({ ...this.formInfo });
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.cancle();
              this.get_seck_list();
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
      this.cancle();
    },

    //点击取消按钮
    cancle() {
      this.formInfo = { ...resetForm };
      this.isShow = false;
      this.time = [];
    },

    //时间改变
    timeChange(timeArr) {
      this.formInfo.begintime = timeArr[0].getTime();
      this.formInfo.endtime = timeArr[1].getTime();
    },
  },

  watch: {
    "formInfo.first_cateid": {
      deep: true,
      handler(val) {
        if (this.isShow == true) {
          let secondCate = this.catelist.filter((item) => {
            return item.id == val;
          })[0];
          this.secondCateList = secondCate ? secondCate.children : [];
        }
      },
    },
    "formInfo.second_cateid": {
      deep: true,
      async handler(val) {
        if (this.isShow == true) {
          let res = await get_goods_list();
          if (res.code == 200) {
            let firstArr = res.list.filter((item) => {
              return item.first_cateid == this.formInfo.first_cateid;
            });
            let secondArr = firstArr.filter((item) => {
              return item.second_cateid == this.formInfo.second_cateid;
            });
            this.goodsList = secondArr.map((item) => {
              return {
                goodsname: item.goodsname,
                id: item.id,
              };
            });
          }
        }
      },
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped></style>