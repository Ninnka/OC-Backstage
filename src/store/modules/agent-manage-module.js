const state = {
  agentMes: {}
};

// getters
const getters = {
  agentMes: state => state.agentMes
};

// actions
const actions = {

};

// mutations
const mutations = {
  update_AgentMes (state, payload) {
    state.agentMes = Object.assign({}, payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
