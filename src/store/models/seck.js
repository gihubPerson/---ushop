import {get_seck_list} from '@/axios/apis/seck'

export default {
    namespaced:true,
    state: {
        secklist:[]
    },
    getters: {
        secklist:state=>state.secklist,
    },
    mutations: {
        GET_SECK_LIST(state,data){
            state.secklist = data
        },
    },
    actions: {
        async get_seck_list({commit,state}){
            let res =await get_seck_list(state.pageinfo)
            if(res.code == 200){
                commit('GET_SECK_LIST',res.list)
            }
        }
    }
};