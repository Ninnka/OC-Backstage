export default {
  updateUser (state, payload) {
    state.user = payload;
  },
  updateBankList (state, payload) {
    state.bankList = payload;
  }
};
