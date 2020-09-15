import {get_user_list,get_user_count} from '@/axios/apis/user'

export default {
    namespaced:true,
    state: {
        userlist:[],
        pageinfo:{
            size:2,
            page:1
        },
        total:0
    },
    getters: {
        userlist:state=>state.userlist,
        total:state=>state.total,
        page:state=>state.pageinfo.page,
        size:state=>state.pageinfo.size,
    },
    mutations: {
        GET_USER_LIST(state,data){
            state.userlist = data
        },
        SET_TOTAL(state,total){
            state.total = total
        },
        SET_PAGE(state,page){
            state.pageinfo.page = page
        },
        SET_SIZE(state,size){
            state.pageinfo.size = size
        }
    },
    actions: {
        async get_user_list({commit,state}){
            let res =await get_user_list(state.pageinfo)
            if(res.code == 200){
                commit('GET_USER_LIST',res.list)
            }

            let total = await get_user_count()
            if(total.code == 200){
                commit('SET_TOTAL',total.list[0].total)
            }
            
        }
    }
};