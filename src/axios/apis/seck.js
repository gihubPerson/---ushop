import http from '../index'
import qs from 'qs'

//获取secklist
export function get_seck_list(data){
    return http.get('/secklist')
} 


//添加seck
export function add_seck_list(data){
    return http.post('/seckadd',data)
}


//修改seck
export function edit_seck_list(data){
    return http.post('/seckedit',data)
}

//删除seck
export function del_seck_list(data){
    return http.post('/seckdelete',qs.stringify(data))
}