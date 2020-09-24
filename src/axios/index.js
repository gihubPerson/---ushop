
import axios from 'axios'
import router from '@/router'
let http = axios.create({
    baseURL:'/api',
    timeout:3000
})

//拦截器
http.interceptors.request.use((config)=>{
    if(config.url != '/login'){
        config.headers.authorization = localStorage.getItem('token')
        
    }
    return config
})

http.interceptors.response.use((response)=>{
    if(response.data.code == 403){
        router.push('/login')
    }
    return response.data
})


export default http