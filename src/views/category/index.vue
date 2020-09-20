<template>
  <div>
    <list @edit='edit' @showInfo='showInfo'></list>
    <alert ref='alert'></alert>
  </div>
</template>

<script>
import List from "./list";
import Alert from "./alert";

//引入请求层
// import {get_cate_list} from '@/axios/apis/cate'

//引入仓库
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //点击打开弹窗
   showInfo(how){
     this.$refs.alert.isShow = true
     this.$refs.alert.isAdd = true
     
   },
   //编辑按钮
   edit(data){
     //传给alert编辑信息

     this.$refs.alert.isShow = true
     this.$refs.alert.isAdd = false
     this.$refs.alert.setinfo(data)
     this.$refs.alert.fileList = [{
       name:'',
       url:this.$server + data.img
     }]
   }
  },
  components: {
    List,
    Alert,
  },
};
</script>
<style scoped>
</style>