<template>
  <div>
    <el-button @click="add" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
    <el-table class="table" :data="goodsList" style="width: 100%" row-key="id" border>
      <el-table-column prop="firstcatename" label="一级分类" width="100"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" width="100"></el-table-column>
      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <img style="width:80px" :src="$server + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="销售价格" width="100"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100"></el-table-column>
      <el-table-column label="是否新品" width="100">
        <template slot-scope="scope">
          <el-switch
            @change="switchChange(scope.row)"
            v-model="scope.row.isnew"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-switch
            @change="switchChange(scope.row)"
            v-model="scope.row.ishot"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2,4,8]"
      :page-size="size"
      :current-page="page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { del_goods_list, edit_goods_list, get_count } from "@/axios/apis/goods";
export default {
  data() {
    return {
      count: 0,
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      goodsList: "goods/goodslist",
      size: "goods/size",
      page: "goods/page",
    }),
  },
  async mounted() {
    //获取角色列表
    if (!this.goodsList.length) {
      this.get_goods_list();
    }
    let n = await get_count();
    this.count = n.list[0].total;
  },
  methods: {
    ...mapActions({
      get_goods_list: "goods/get_goods_list",
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
          console.log(this.goodsList.length == 1);
          if (this.goodsList.length == 1 && this.count >1) {
            let newPage = this.page - 1
            this.$store.commit("goods/CHANGE_PAGE", newPage);
           } 
            let res = await del_goods_list({ id });
            this.get_goods_list();
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
    //切换开关  发送至服务器保存
    async switchChange(data) {
      // data.firstcatename ? delete data.firstcatename : ''
      // data.secondcatename ? delete data.secondcatename : ''
      // let res = await edit_goods_list(data)
    },
    //页码改变钩子
    handleCurrentChange(val) {
      console.log(val);
      this.$store.commit("goods/CHANGE_PAGE", val);
      this.get_goods_list();
    },
    //每页数量改变钩子
    handleSizeChange(val) {
      console.log(val);
      this.$store.commit("goods/CHANGE_SIZE", val);
      this.get_goods_list();
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