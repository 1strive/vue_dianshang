import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
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
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            // console.log(result);//null 只是通知服务器改变返回的数据（改变的是其他接口返回的数据）
            return 'ok'
        } else {
            //返回失败标记
            return Promise.reject(new Error('faile'))
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
