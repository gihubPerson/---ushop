import http from '../index'
import qs from 'qs'

//获取rolelist
export function get_role_list(){
    return http.get('/rolelist')
} 

//添加role
export function add_role_list(data){
    return http.post('/roleadd',qs.stringify(data))
}


//修改role
export function edit_role_list(data){
    return http.post('/roleedit',qs.stringify(data))
}

//删除role
export function del_role_list(data){
    return http.post('/roledelete',qs.stringify(data))
}