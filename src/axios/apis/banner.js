import http from '../index'
import qs from 'qs'

//获取bannerlist
export function get_banner_list(){
    return http.get('/bannerlist?istree=1')
} 

//添加banner
export function add_banner_list(data){
    console.log(data);
    return http.post('/banneradd',data)
}


//修改banner
export function edit_banner_list(data){
    return http.post('/banneredit',data)
}

//删除banner
export function del_banner_list(data){
    return http.post('/bannerdelete',qs.stringify(data))
}