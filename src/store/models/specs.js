import {get_specs_list} from '@/axios/apis/specs'

export default {
    namespaced:true,
    state: {
        specslist:[]
    },
    getters: {
        specslist:state=>state.specslist
    },
    mutations: {
        GET_SPECS_LIST(state,data){
            state.specslist = data
        }
    },
    actions: {
        async get_specs_list({commit}){
            let res =await get_specs_list()
            if(res.code == 200){
                commit('GET_SPECS_LIST',res.list)
            }
            
        }
    }
};