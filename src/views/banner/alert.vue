<template>
  <div>
    <el-dialog :before-close="beforeClose" :title="isAdd?'增加':'修改'" :visible.sync="isShow">
      <el-form ref="form" :model="formInfo" :rules="rules">
        

        <el-form-item label="轮播图名称" label-width="100px" prop="title">
          <el-input v-model="formInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" label-width="100px">
          <!-- 上传 -->
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :file-list="fileList"
            :on-change="imgChange"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :modal="false" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
import { add_banner_list, edit_banner_list } from "@/axios/apis/banner";
import { mapActions, mapGetters } from "vuex";
let defaultForm = {
  title: '',
  img: "",
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
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      file: "",
    };
  },
  created() {
    if (!this.bannerList.length) {
      this.get_banner_list();
    }
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerlist",
    }),
  },
  methods: {
    ...mapActions({
      get_banner_list: "banner/get_banner_list",
    }),

    //给表单赋值数据
    setinfo(data) {
      this.formInfo = data;
    },
    //转为formdata对象
    toFormData(obj) {
      let d = new FormData();
      obj.img = this.file;
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
            
            let res = await add_banner_list(this.toFormData({ ...this.formInfo }));
            if (res.code == 200) {
              this.$message.success("添加成功");
              //点击确定按钮  关闭弹窗  清除数据
              this.isShow = false;
              this.formInfo = resetForm;
              this.get_banner_list();
            } else {
              this.$message.warning(res.msg);
            }
          } else {
            //如果是修改
            let res = await edit_banner_list(this.toFormData({ ...this.formInfo }));
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.formInfo = { ...resetForm };
              this.get_banner_list();
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
      
      this.$refs.upload.clearFiles()

      done();
    },

    //点击取消按钮
    cancle() {
      this.formInfo = { ...resetForm };
      this.isShow = false;
   
      this.$refs.upload.clearFiles()

    },
//图片
    imgChange(file) {
      this.file = file.raw;
    },
    handleRemove(file, fileList) {
      this.fileList = []
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },

  watch: {},
  components: {},
};
</script>
<style lang='stylus' scoped></style>