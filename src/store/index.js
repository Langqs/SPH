import Vue from 'vue';
//引入vuex
import Vuex from 'vuex'
//封装游客身份模块uuid-->生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'
//
import {setToken,getToken,removeToken} from '@/utils/token'
//引入API
import {
    reqCategoryList,
    reqGetBannerList,
    reqFloorList,
    reqGetSearchInfo,
    reqGoodsInfo,
    reqAddShopCart,
    reqCartList,
    reqDeleteCartById,
    reqGetCode,
    reqUserRegister,
    reqLogin,
    reqUserInfo,
    reqOutLogin,
    reqAddressInfo,
    reqOrderInfo,
} from '@/api';
import { iteratee } from 'lodash';
//使用插件
Vue.use(Vuex)
//state：仓库存储数据的地方
const state = {
    count: 1,
    categoryList: [],    //三级菜单
    getBannerList: [],   //banner
    getFloorList: [],    //floor组件数据
    getSearchList: {},
    getDetailList: {}, //产品详情
    CartList: [], //购物车列表
    uuid_token: getUUID(),//游客临时身份
    code: '',//注册验证码
    token: getToken(),//登录返回获取token
    userInfo:{},//用户信息
    addressInfo:[],//用户地址
    orderInfo:[],//商品清单
}
//action：处理action可以书写自己的业务逻辑，也可以处理异步
const actions = {
    add(context, value) {
        context.commit('ADD', value)
    },
    reduce(context, value) {
        context.commit('REAUCE', value)
    },

    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //mock获取首页banner图片
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //mock获取首页Floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
    //post获取Search组件数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    },
    //get产品详情
    async getDetailList({ commit }, id) {
        let result = await reqGoodsInfo(id)
        if (result.code == 200) {
            commit('GETDETAILLIST', result.data)
        }
    },
    //添加购物车
    async addShopCart({ commit }, { id, number }) {
        let result = await reqAddShopCart(id, number)
        if (result.code == 200) {
            return "true"
        } else {
            //加入购物车失败
            return Promise.reject(new Error('false'))
        }
    },
    //购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车商品
    async deleteCartListBySkuId({ commit }, id) {
        let result = await reqDeleteCartById(id)
        if (result.code == 200) {
            return true
        } else {
            return Promise.reject(new Error('false'))
        }

    },
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    //注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return true
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //登录
    async userLogin({commit},data){
        let result = await reqLogin(data);
        if (result.code == 200) {
            commit('USERLOGIN',result.data.token);
            //持久化存储token
            setToken(result.data.token)
            return true
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO',result.data)
            return true
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //退出登录
    async userLogOut({commit}){
        let result = await reqOutLogin()
        if (result.code == 200) {
            commit('USERLOGOUT')
            return true
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //用户地址信息
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if (result.code==200) {
            commit('GETADDRESSINFO',result.data)
        }
    },
    //购买商品清单
    async getOrderInfo({commit}){
        let result =await reqOrderInfo()
        if (result.code==200) {
            commit('GETORDERINFO',result.data)
        }else{
            return Promise.reject(new Error(result.message))
        }
    }

}
//mutations:修改state的唯一手段
const mutations = {
    ADD(state, value) {
        state.count += value
    },
    REAUCE(state, value) {
        state.count -= value
    },
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state, value) {
        state.getBannerList = value
    },
    GETFLOORLIST(state, value) {
        state.getFloorList = value
    },
    GETSEARCHLIST(state, value) {
        state.getSearchList = value
    },
    GETDETAILLIST(state, value) {
        state.getDetailList = value
    },
    GETCARTLIST(state, value) {
        state.CartList = value
    },
    GETCODE(state, value) {
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    USERLOGOUT(state){
        //清空仓库用户数据
        state.token = '';
        state.userInfo = {};
        //清空本地token
        removeToken();
    },
    GETADDRESSINFO(state,value){
        state.addressInfo = value
    },
    GETORDERINFO(state,value){
        state.orderInfo = value
    }
}

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    attrsList(state) {
        return state.getSearchList.attrsList
    },
    trademarkList(state) {
        return state.getSearchList.trademarkList
    },
    //简化产品信息
    categoryView(state) {
        return state.getDetailList.categoryView || {}
    },
    //产品售卖属性简化
    skuInfo(state) {
        return state.getDetailList.skuInfo || {}
    },
    //产品售卖属性简化
    spuSaleAttrList(state) {
        return state.getDetailList.spuSaleAttrList || []
    },
    cartInfoList(state) {
        return state.CartList[0].cartInfoList || []
    }

}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})