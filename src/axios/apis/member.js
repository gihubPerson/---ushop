import http from '../index'
import qs from 'qs'

//获取memberlist
export function get_member_list(){
    return http.get('/memberlist')
} 



//修改member
export function edit_member_list(data){
    return http.post('/memberedit',qs.stringify(data))
}