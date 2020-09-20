import http from '../index'
import qs from 'qs'


export function toLogin(data){
    return http.post('/userlogin',qs.stringify(data))
}
