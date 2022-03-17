import { reqCartList } from "@/api";

const state = {}
const mutations = {}
const actions = {
  //获取购物车数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200)
      console.log(result,'222');
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}