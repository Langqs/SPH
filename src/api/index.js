//当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
import { method } from 'lodash'

//三级联动接口
//  /api/product/getBaseCategoryList    get 无参数
export const reqCategoryList = ()=>{
    //发请求:axios发请求返回结果Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//mock请求,获取banner
export const reqGetBannerList = ()=>{
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}
//mock请求,获取floor组件数据
export const reqFloorList = ()=>{
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}
//Search组件数据 post
export const reqGetSearchInfo =(params) =>{
    return requests({
        url:'/list',
        data:params,
        method:'post'
    })
}
//产品详情信息
export const reqGoodsInfo =(id) =>{
    return requests({
        url:`/item/${id}`,
        method:'get'
    })
}
//添加到购物车
export const reqAddShopCart =(id,number) =>{
    return requests({
        url:`/cart/addToCart/${id}/${number}`,
        method:'post'
    })
}
//购物车列表数据
export const reqCartList =() =>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}
//删除购物车商品
export const reqDeleteCartById = (id)=>{
    return requests({
        url: `cart/deleteCart/${id}`,
        method:'delete'
    })
}
//登录
export const reqLogin=(data)=>{
    return requests({
        url:'/user/passport/login',
        data,
        method:'post'
    })
}
//获取验证码
export const reqGetCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}
//注册
export const reqUserRegister=(data)=>{
    return requests({
        url:'/user/passport/register',
        data:data,
        method:'post'
    })
}
//获取用户信息
export const reqUserInfo = ()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}
//退出登录
export const reqOutLogin = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}
//获取用户地址
export const reqAddressInfo=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}
//获取商品清单
export const reqOrderInfo=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}
//提交订单
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })
}
//订单信息
export const reqPayInfo=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}
//获取支付订单状态
export const reqPayState=(orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}
//获取个人中心数据
export const reqMyOrderList=(page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}