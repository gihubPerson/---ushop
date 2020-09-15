<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table class="table" :data="cateList" style="width: 100%" row-key="id" border>
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="分类图片" width="180">
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
import { del_cate_list } from "@/axios/apis/cate";
export default {
  data() {
    return {
      
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      cateList: "cate/catelist",
    }),
  },
  mounted() {
    //获取角色列表
    if (!this.cateList.length) {
      this.get_cate_list();
    }
  },
  methods: {
    
    ...mapActions({
      get_cate_list: "cate/get_cate_list",
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
          let res = await del_cate_list({ id });
          this.get_cate_list();
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
      //  把data中的menus字符串处理成数组
      if (typeof data.menus == "string") {
        let menus = data.menus.split(",").map(Number);
        data.menus = menus;
      }

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