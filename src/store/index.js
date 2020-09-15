import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './models/menu'
import role from './models/role'
import user from './models/user'
import cate from './models/cate'
let store = new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        menu,role,user,cate
    }
})

export default store