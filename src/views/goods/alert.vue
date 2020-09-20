<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="一级分类" label-width="100px" prop="first_cateid">
              <el-select v-model="formInfo.first_cateid">
                <el-option label="请选择" :value="-1"></el-option>
                <el-option
                  v-for="(item,idx) in catelist"
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
                  v-for="(item,idx) in secondCateList"
                  :key="idx"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品名称" label-width="100px" prop="goodsname">
              <el-input v-model="formInfo.goodsname" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" label-width="100px" prop="price">
              <el-input v-model="formInfo.price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="市场价格" label-width="100px" prop="market_price">
              <el-input v-model="formInfo.market_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" label-width="100px">
              <!-- 上传 -->
              <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="fileList"
                :on-change="imgChange"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :modal="false" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>

            <el-form-item label="商品规格" label-width="100px" prop="specsid">
              <el-select v-model="formInfo.specsid">
                <el-option label="请选择" :value="-1"></el-option>
                <el-option
                  v-for="(item,idx) in specslist"
                  :key="idx"
                  :label="item.specsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="规格属性值" label-width="100px" prop="specsattr">
              <el-select
                :disabled="formInfo.specsid == -1 ? true : false"
                :multiple="true"
                v-model="formInfo.specsattr"
              >
                <el-option label="请选择" :value="-1"></el-option>
                <el-option v-for="(item,idx) in attrs" :key="idx" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否新品" label-width="100px">
              <el-radio-group v-model="formInfo.isnew">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否热卖" label-width="100px">
              <el-radio-group v-model="formInfo.ishot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="状态" label-width="100px">
              <el-radio-group v-model="formInfo.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="详细描述" name="second">
            <!-- <my-editor ref="editor" width="500px" height='400px'></my-editor> -->
            <editor-bar v-model="formInfo.description" :isClear="isClear" @change="change"></editor-bar>
          </el-tab-pane>
        </el-tabs>
        <el-form-item label label-width="100px">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add_goods_list, edit_goods_list } from "@/axios/apis/goods";
import { mapActions, mapGetters } from "vuex";
import EditorBar from "../../components/wangEnduit";
let defaultForm = {
  first_cateid: -1,
  second_cateid: -1,
  goodsname: "",
  price: "",
  market_price: "",
  img: "",
  description: "",
  specsid: -1,
  specsattr: [],
  isnew: 2,
  ishot: 2,
  status: 1,
};
let resetForm = {
  ...defaultForm,
};
export default {
  data() {
    return {
      activeName: "first",
      isShow: false,
      isAdd: true,
      //二级分类列表
      secondCateList: [],
      //规格属性列表
      attrs: [],
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
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请输入商品属性值", trigger: "blur" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      file: "",
      //编辑器
      isClear: false,
      detail: "",
    };
  },

  created() {},
  mounted() {
    if (!this.goodsList.length) {
      this.get_goods_list();
    }
    if (!this.catelist.length) {
      this.get_cate_list();
    }
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/goodslist",
      catelist: "cate/catelist",
      specslist: "specs/specslist",
    }),
  },
  methods: {
    ...mapActions({
      get_goods_list: "goods/get_goods_list",
      get_cate_list: "cate/get_cate_list",
      get_specs_list: "specs/get_specs_list",
    }),

    //给表单赋值数据
    setinfo(data) {
      this.formInfo = data;
    },
    //转为formdata对象
    toFormData(obj) {
      let d = new FormData();
      obj.img = this.file;
      obj.specsattr = obj.specsattr.join(",");
      console.log(obj);
      for (let key in obj) {
        d.append(key, obj[key]);
      }
      return d;
    },
    //点击确定按钮
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            //如果是添加,就走添加过程
            let res = await add_goods_list(
              this.toFormData({ ...this.formInfo })
            );
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.cancle();
              this.get_goods_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_goods_list(
              this.toFormData({ ...this.formInfo })
            );
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.cancle();
              this.get_goods_list();
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
      this.$refs.upload.clearFiles();
      this.activeName = "first";
    },
    //图片
    imgChange(file) {
      this.file = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //tab切换
    handleClick(tab, event) {},
    //编辑器
    change(val) {},
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
    "formInfo.specsid": {
      deep: true,
      handler(val) {
        if (this.isShow == true) {
          let attrs = this.specslist.filter((item) => {
            return item.id == val;
          })[0];
          console.log(attrs);
          this.attrs = attrs ? attrs.attrs : "";
        }
      },
    },
  },
  components: {
    EditorBar,
  },
};
</script>
<style lang='stylus' scoped></style>