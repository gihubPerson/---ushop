import http from '../index'
import qs from 'qs'

//获取specslist
export function get_specs_list(){
    return http.get('/specslist?istree=1')
} 

//添加specs
export function add_specs_list(data){
    return http.post('/specsadd',qs.stringify(data))
}


//修改specs
export function edit_specs_list(data){
    return http.post('/specsedit',qs.stringify(data))
}

//删除specs
export function del_specs_list(data){
    return http.post('/specsdelete',qs.stringify(data))
}