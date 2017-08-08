import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
	count:0
}

// getters
const getters = {
  getCount: state => state.count.toFixed(2)
}

//actions
const actions = {
	[types.HALF] ({ commit }) {   
		setTimeout(function(){
			commit(types.HALF);
		},2000)
	}
}

// mutations
const mutations = {
  [types.COUNT_ADD] (state) {
    state.count++;
  },

  [types.COUNT_MINUX] (state) {
	state.count--;
  },
  [types.DOUBLE] (state) {
    state.count+=state.count;
  },
  [types.HALF](state){
  	state.count/=2;
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
