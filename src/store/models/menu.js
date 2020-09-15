import {get_menu_list} from '@/axios/apis/menu'

export default {
    namespaced:true,
    state: {
        menulist:[]
    },
    getters: {
        menulist:state=>state.menulist
    },
    mutations: {
        GET_MENU_LIST(state,data){
            state.menulist = data
        }
    },
    actions: {
        async get_menu_list({commit}){
            let res =await get_menu_list()
            if(res.code == 200){
                commit('GET_MENU_LIST',res.list)
            }
            
        }
    }
};