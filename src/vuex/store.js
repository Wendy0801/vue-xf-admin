import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    bannerTitle: '',
    bannerType:'',
    bannerAdmasterType:'',
    bannerExpousreAddress:''
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    SETBANNERTITLE(state, message) {
        state.bannerTitle  = message;
    },
    SETBANNERTYPE(state, value) {
        state.bannerType  = value;
    },
    SETBANNERADMASTERTYPE(state, value) {
        state.bannerAdmasterType  = value;
    },
    SETBANNEREXPOUSREADDRESS(state, value) {
        state.bannerExpousreAddress  = value;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})