const state = {
  userMes: {}
};

// getters
const getters = {
  userMes: state => state.userMes
};

// actions
const actions = {

};

// mutations
const mutations = {
  update_UserMes (state, payload) {
    state.userMes = Object.assign({}, payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
