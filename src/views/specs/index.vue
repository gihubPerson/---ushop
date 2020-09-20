<template>
  <div>
    <list @edit="edit" @showInfo="showInfo"></list>
    <alert ref="alert"></alert>
  </div>
</template>

<script>
import List from "./list";
import Alert from "./alert";

//引入请求层
// import {get_specs_list} from '@/axios/apis/specs'

//引入仓库
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //点击打开弹窗
    showInfo(how) {
      this.$refs.alert.isShow = true;
      this.$refs.alert.isAdd = true;
    },
    //编辑按钮
    edit(data) {
      //传给alert编辑信息
      this.$refs.alert.isShow = true;
      this.$refs.alert.isAdd = false;
      //  处理attrs为对象数组形式
      this.$refs.alert.list = data.attrs.map((item) => {
        return {
          value: item,
        };
      });
      this.$refs.alert.formInfo = data;
    },
  },
  components: {
    List,
    Alert,
  },
};
</script>
<style scoped>
</style>