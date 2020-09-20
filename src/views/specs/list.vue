<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table class="table" :data="specsList" style="width: 100%" row-key="id" border>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="specsname" label="属性名称" width="180"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag style="margin-right:3px" v-for="(item,idx) in scope.row.attrs" :key="idx" type="success" disable-transitions>{{item}}</el-tag>
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
import { del_specs_list } from "@/axios/apis/specs";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      specsList: "specs/specslist",
    }),
  },
  mounted() {
    //获取规格列表
    if (!this.specsList.length) {
      this.get_specs_list();
    }
  },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
    }),
    //打开弹窗
    add() {
      console.log(123123);
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
          let res = await del_specs_list({ id });
          this.get_specs_list();
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