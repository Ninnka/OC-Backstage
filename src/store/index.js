import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import CommonApi from '@assets/js/common';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    user: {
      name: 'name'
    },
    bankList: [
      {
        name: '张三',
        id: 1,
        card: '622568032300016316',
        bankCode: '0001'
      },
      {
        name: '李四',
        id: 2,
        card: '622568032300026316',
        bankCode: '0002'
      }
    ]
  },
  getters: {
    user: state => state.user,
    bankList: (state) => {
      if (state.bankList.length > 0) {
        return state.bankList.map((item) => {
          CommonApi.bankList.map((bank) => {
            if (item.bankCode === bank.bankCode) {
              item.bankMes = bank;
            }
          });
          return item;
        });
      } else {
        return state.bankList;
      }
    }
  },
  actions,
  mutations,
  strict: debug
});
