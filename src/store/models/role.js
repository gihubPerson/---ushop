import {get_role_list} from '@/axios/apis/role'

export default {
    namespaced:true,
    state: {
        rolelist:[]
    },
    getters: {
        rolelist:state=>state.rolelist
    },
    mutations: {
        GET_ROLE_LIST(state,data){
            state.rolelist = data
        }
    },
    actions: {
        async get_role_list({commit}){
            let res =await get_role_list()
            if(res.code == 200){
                commit('GET_ROLE_LIST',res.list)
            }
            
        }
    }
};