import http from '../index'
import qs from 'qs'

//获取goodslist
export function get_goods_list(data){
    get_count()
    return http.get('/goodslist',{
        params:data
    })
} 

//获取数量
export function get_count(){
    return http.get('/goodscount')
} 

//添加goods
export function add_goods_list(data){
    console.log(data);
    return http.post('/goodsadd',data)
}


//修改goods
export function edit_goods_list(data){
    return http.post('/goodsedit',data)
}

//删除goods
export function del_goods_list(data){
    return http.post('/goodsdelete',qs.stringify(data))
}