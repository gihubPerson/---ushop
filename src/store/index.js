import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './models/menu'
import role from './models/role'
import user from './models/user'
import cate from './models/cate'
import specs from './models/specs'
import goods from './models/goods'
import member from './models/member'
import banner from './models/banner'
import seck from './models/seck'
let store = new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        menu,role,user,cate,specs,goods,member,banner,seck
    }
})

export default store