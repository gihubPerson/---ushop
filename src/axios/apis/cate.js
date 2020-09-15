import http from '../index'
import qs from 'qs'

//获取catelist
export function get_cate_list(){
    return http.get('/catelist?istree=1')
} 

//添加cate
export function add_cate_list(data){
    console.log(data);
    return http.post('/cateadd',data)
}


//修改cate
export function edit_cate_list(data){
    return http.post('/cateedit',data)
}

//删除cate
export function del_cate_list(data){
    return http.post('/catedelete',qs.stringify(data))
}