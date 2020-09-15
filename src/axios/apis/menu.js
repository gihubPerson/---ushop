import http from '../index'
import qs from 'qs'

//获取menulist
export function get_menu_list(){
    return http.get('/menulist?istree=1')
} 

//添加menu
export function add_menu_list(data){
    return http.post('/menuadd',qs.stringify(data))
}


//修改menu
export function edit_menu_list(data){
    return http.post('/menuedit',qs.stringify(data))
}

//删除menu
export function del_menu_list(data){
    return http.post('/menudelete',qs.stringify(data))
}