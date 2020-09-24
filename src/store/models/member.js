import {get_member_list} from '@/axios/apis/member'

export default {
    namespaced:true,
    state: {
        memberlist:[]
    },
    getters: {
        memberlist:state=>state.memberlist
    },
    mutations: {
        GET_MEMBER_LIST(state,data){
            state.memberlist = data
        }
    },
    actions: {
        async get_member_list({commit}){
            let res =await get_member_list()
            if(res.code == 200){
                commit('GET_MEMBER_LIST',res.list)
            }
            
        }
    }
};