import {get_goods_list} from '@/axios/apis/goods'

export default {
    namespaced:true,
    state: {
        goodslist:[],
        pageinfo:{
            size:4,
            page:1
        }
    },
    getters: {
        goodslist:state=>state.goodslist,
        size:state=>state.pageinfo.size,
        page:state=>state.pageinfo.page,
    },
    mutations: {
        GET_GOODS_LIST(state,data){
            state.goodslist = data
        },
        CHANGE_SIZE(state,data){
            state.pageinfo.size = data
        },
        CHANGE_PAGE(state,data){
            state.pageinfo.page = data
        }
    },
    actions: {
        async get_goods_list({commit,state}){
            let res =await get_goods_list(state.pageinfo)
            if(res.code == 200){
                commit('GET_GOODS_LIST',res.list)
            }
        }
    }
};