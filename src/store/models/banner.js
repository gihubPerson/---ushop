import {get_banner_list} from '@/axios/apis/banner'

export default {
    namespaced:true,
    state: {
        bannerlist:[]
    },
    getters: {
        bannerlist:state=>state.bannerlist
    },
    mutations: {
        GET_BANNER_LIST(state,data){
            state.bannerlist = data
        }
    },
    actions: {
        async get_banner_list({commit}){
            let res =await get_banner_list()
            if(res.code == 200){
                commit('GET_BANNER_LIST',res.list)
            }
            
        }
    }
};