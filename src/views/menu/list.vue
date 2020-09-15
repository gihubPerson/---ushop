<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table
      class="table"
      :data="menuList"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === 1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.type == 1 ? '目录' : '菜单'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
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
import { del_menu_list } from "@/axios/apis/menu";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      menuList: "menu/menulist",
    }),
  },
  mounted() {
    //获取菜单列表
    if (!this.menuList.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
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
          let res = await del_menu_list({ id });
          this.get_menu_list();
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