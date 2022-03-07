import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//state：仓库存储数据的地方
const state = {
};
//mutations：修改state的唯一手段
const mutations = {
};
//action:处理action，书写自己的业务逻辑，也可以处理异步
const actions = {
    //此处可以书写业务逻辑但不能修改state
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
}