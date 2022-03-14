/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-11 22:50:05
 * @LastEditors: JA
 */
import Vue from 'vue'
import Vuex from 'vuex'


import { reqGetSearchInfo } from '@/api'
Vue.use(Vuex)

//state：仓库存储数据的地方
const state = {
    //仓库初始状态（保证数据结构与后端一致）
    searchList: {}
};
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
//action:处理action，书写自己的业务逻辑，也可以处理异步
const actions = {
    //此处可以书写业务逻辑但不能修改state
    async getSearchList({ commit }, params = {}) {//第二个参数这样写是默认参数，传入参数会覆盖此参数
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//仓库中的state是分模块的而getters不分
const getters = {
    //当前形参state为当前仓库中的state
    goodsList(state) {
        return state?.searchList?.goodsList
    },
    trademarkList(state) {
        return state?.searchList?.trademarkList
    },
    attrsList(state) {
        return state?.searchList?.attrsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}