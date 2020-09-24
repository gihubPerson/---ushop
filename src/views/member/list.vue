<template>
  <div>
    <el-table
      class="table"
      :data="memberList"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="uid" label="用户ID" width="300"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
      <el-table-column label="注册日期" width="250">
        <template slot-scope="scope">
              {{scope.row.addtime | totime}}
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { del_member_list } from "@/axios/apis/member";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      memberList: "member/memberlist",
    }),
  },
  mounted() {
    //获取菜单列表
    if (!this.memberList.length) {
      this.get_member_list();
    }
  },
  methods: {
    ...mapActions({
      get_member_list: "member/get_member_list",
    }),
    
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