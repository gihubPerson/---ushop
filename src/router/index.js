import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	   return originalPush.call(this, location).catch(err => err)
	}
Vue.use(Router)

let router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:()=>import('@/pages/layout'),
      redirect:'/index',
      children:[
        {
          path:'/index',
          component:()=>import('@/views/index'),
          meta:{
            title:'首页管理',
            isLogin:true
          }
        },
        {
          path:'/menu',
          component:()=>import('@/views/menu'),
          meta:{
            title:'菜单管理',
            isLogin:true
          }
        },
        {
          path:'/role',
          component:()=>import('@/views/role'),
          meta:{
            title:'角色管理',
            isLogin:true
          }
        },
        {
          path:'/user',
          component:()=>import('@/views/user'),
          meta:{
            title:'管理员管理',
            isLogin:true
          }
        },
        {
          path:'/category',
          component:()=>import('@/views/category'),
          meta:{
            title:'商品分类',
            isLogin:true
          }
        },
        {
          path:'/specs',
          component:()=>import('@/views/specs'),
          meta:{
            title:'商品规格',
            isLogin:true
          }
        },
        {
          path:'/goods',
          component:()=>import('@/views/goods'),
          meta:{
            title:'商品管理',
            isLogin:true
          }
        },
        {
          path:'/member',
          component:()=>import('@/views/member'),
          meta:{
            title:'会员管理',
            isLogin:true
          }
        },
        {
          path:'/banner',
          component:()=>import('@/views/banner'),
          meta:{
            title:'轮播图管理',
            isLogin:true
          }
        },
        {
          path:'/seckill',
          component:()=>import('@/views/seckill'),
          meta:{
            title:'秒杀管理',
            isLogin:true
          }
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/pages/login'),
      meta:{
        title:'登录',
        isLogin:false
      }
    },
    {
      path:'*',
      component:()=>import('@/pages/notFound'),
      meta:{
        title:'404',
        isLogin:false
      }
    },
  ]
})

//全局守卫
//路由信息内isLogin = true 的路由需要登录之后才能访问
router.beforeEach((to,from,next)=>{
  window.scroll(0,0)
  document.title = to.meta.title
  if(to.meta.isLogin){
    if(localStorage.getItem('token')){
      next()
    }else{
      next('/login?towher=' + to.path)
    }
  }else{
    next()
  }
})

export default router
