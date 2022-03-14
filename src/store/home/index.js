/*
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-07 22:29:08
 * @LastEditors: JA
 */
import { reqCategoryList, reqGetBannerList ,reqFloorList } from '@/api'


//state：仓库存储数据的地方
const state = {
    // state中默认初始值数据类型与服务器返回数据类型保持一致
    categoryList: [],//初始值为空数组
    bannerList: [],
    floorList:[]
};
//mutations：修改state的唯一手段
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
//action:处理action，书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('GETCATEGORYLIST', result)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }

    //此处可以书写业务逻辑但不能修改state
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}