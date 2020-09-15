
import axios from 'axios'

let http = axios.create({
    baseURL:'/api',
    timeout:3000
})

//拦截器
http.interceptors.request.use((config)=>{
    return config
})

http.interceptors.response.use((response)=>{
    return response.data
})


export default http