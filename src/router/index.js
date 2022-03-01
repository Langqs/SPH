//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Black from '@/components/Black.vue'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 解决 push 重定向 跳转报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 解决 replace 重定向 跳转报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
//配置路由
let router = new VueRouter({
    routes:[
        {
            name:'home',
            path:"/home",
            // component:Home,
            
            //路由懒加载
            component:()=>import('@/pages/Home'),
            meta:{show:true}

        },
        {
            name:'login',
            path:"/login",
            // component:Login,
            component:()=>import('@/pages/Login'),
            meta:{show:false}

        },
        {
            name:'register',
            path:"/register",
            component:Register,
            meta:{show:false}

        },
        {
            name:'search',
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true}

        },
        {
            name:'detail',
            path:"/detail/:id?",
            component:Detail,
            meta:{show:true}

        },
        {
            name:'addCartSuccess',
            path:"/addCartSuccess",
            component:AddCartSuccess,
            meta:{show:true}

        },
        {
            name:'shopCart',
            path:"/shopCart",
            component:ShopCart,
            meta:{show:true}

        },
        {
            name:'trade',
            path:"/trade",
            component:Trade,
            meta:{show:true},
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.path=="/shopCart"){
                    next()
                }else{
                    next(false)
                }
            }

        },
        {
            name:'pay',
            path:"/pay",
            component:Pay,
            meta:{show:true},

            beforeEnter: (to, from, next) => {
                if(from.path=="/trade"){
                    next()
                }else{
                    next(false)
                }
            }

        },
        {
            name:'paySuccess',
            path:"/paySuccess",
            component:PaySuccess,
            meta:{show:true},
        },
        {
            name:'center',
            path:"/center",
            component:Center,
            meta:{show:true},
            children:[
                {
                    name:'myorder',
                    path:'myorder',
                    component:MyOrder
                },
                {
                    name:'grouporder',
                    path:'grouporder',
                    component:GroupOrder
                },
                {
                    path:'/center',
                    redirect: '/center/myorder'
                }
            ]

        },
        //重定向，在项目跑起来的时候，访问/，立马定向到指定位置
        {
            path:'/',
            redirect:"/home"
        },
        //空白页
        {
            name:'black',
            path:"/black",
            component:Black,
        }

    ],
    //路由跳转后页面回到顶部
    scrollBehavior (to, from, savedPosition) {
        return{
            x:0,
            y:0,
        }
    }
});

//全局守卫,前置守卫
router.beforeEach(async(to,from,next)=>{
    let token = store.state.token
    let userName = store.state.userInfo.name
    //如果本地有token
    if (token) {
        //判断是否去登录
        if (to.path == '/login') {
            next('/home')
        }else{
            //登录，取得不是login
            //是否有用户信息，有放行
            if (userName) {
                next()
            //没有用户信息
            }else{
                try {
                    //去获取用户信息，然后放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //没有获取到用户信息（token失效），删除本地token，去登录
                    await store.dispatch('userLogOut')
                    next('/login')
                }
            }
        }
    }else{
        //没有token，去登录,如果去的是登录，直接放行
        if (to.path == '/login'||to.path == '/register') {
            next()
        }else{
            //如果不是去登录，把未登录的时候想去而没去成的信息保存
            let toPath=to.path
            next('/login?redirect='+toPath)
        }
    }
})


export default router