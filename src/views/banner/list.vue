<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table class="table" :data="bannerList" style="width: 100%" row-key="id" border>
      <el-table-column prop="title" label="轮播图名称" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img style="width:80px" :src="$server + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status == 1 ? '启用' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { del_banner_list } from "@/axios/apis/banner";
export default {
  data() {
    return {
      
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerlist",
    }),
  },
  mounted() {
    //获取角色列表
    if (!this.bannerList.length) {
      this.get_banner_list();
    }
  },
  methods: {
    
    ...mapActions({
      get_banner_list: "banner/get_banner_list",
    }),
    //打开弹窗
    add() {
      this.$emit("showInfo");
    },
    //删除
    del(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await del_banner_list({ id });
          this.get_banner_list();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    edit(data) {

      this.$emit("edit", { ...data });
    },
  },
  components: {},
};
</script>
<style lang='stylus' scoped>
.el-icon-circle-plus-outline {
  height: 10px;
}

.table {
  margin-top: 20px;
  border-radius: 5px;
}
</style>