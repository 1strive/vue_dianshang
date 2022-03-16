import { reqGoodsInfo } from "@/api";
const state = {
    goodInfo: {},
    //游客临时身份
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
};
//简化数据而生
const getters = {
    categoryView(state) {
        return state?.goodInfo?.categoryView
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    state,
    actions,
    mutations,
    getters,
};
