<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table
      class="table"
      :data="userList"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      
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
          <el-button @click="del(scope.row.uid)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapActions } from "vuex";
import { del_user_list} from "@/axios/apis/user";
export default {
  data() {
    return {
     
    };
  },
  created() {
  },
  computed: {
    ...mapGetters({
      userList: "user/userlist",
      total:'user/total',
      size:'user/size',
      page:'user/page',
    }),
  },
  async mounted() {
    //获取用户列表
    if (!this.userList.length) {
      this.get_user_list();
    }
  },
  methods: {
    ...mapActions({
      get_user_list: "user/get_user_list",
      
    }),
    ...mapMutations({
        set_page:'user/SET_PAGE',
        set_size:'user/SET_SIZE',
    }),
    //打开弹窗
    add() {
      console.log(123123);
      this.$emit("showInfo");
    },
    //删除
    del(uid) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await del_user_list({ uid });
          if(res.code == 200){
            //判断当前页是否是最后一条,如果是,就当前页-1
            if(this.userList.length == 1){
              let page = this.page - 1
              this.set_page(page)
              
            }
            this.get_user_list();
            
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          }else{
            this.$message({
              type:'warning',
              message:res.msg
            })
          }
          
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
      let newData = { ...data }
      newData.password = ''
      this.$emit("edit", newData);
    },
    //切换每页多少条钩子
    handleSizeChange(size){
      this.set_size(size)
      this.get_user_list();
      
    },
    // 切换当前页钩子
    handleCurrentChange(page){
      this.set_page(page)
      this.get_user_list();
    }
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