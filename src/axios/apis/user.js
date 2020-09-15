import http from '../index'
import qs from 'qs'

//获取userlist
// @params size  page
export function get_user_list(pageinfo){
    return http.get('/userlist',{
        params:pageinfo
    })
} 

//获取管理员总数
export function get_user_count(){
    return http.get('/usercount')
}
//添加user
export function add_user_list(data){
    return http.post('/useradd',qs.stringify(data))
}


//修改user
export function edit_user_list(data){
    return http.post('/useredit',qs.stringify(data))
}

//删除user
export function del_user_list(data){
    console.log(data);
    return http.post('/userdelete',qs.stringify(data))
}