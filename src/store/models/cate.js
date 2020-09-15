import {get_cate_list} from '@/axios/apis/cate'

export default {
    namespaced:true,
    state: {
        catelist:[]
    },
    getters: {
        catelist:state=>state.catelist
    },
    mutations: {
        GET_CATE_LIST(state,data){
            state.catelist = data
        }
    },
    actions: {
        async get_cate_list({commit}){
            let res =await get_cate_list()
            if(res.code == 200){
                commit('GET_CATE_LIST',res.list)
            }
            
        }
    }
};