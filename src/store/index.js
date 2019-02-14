import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import actions from './actions';
import mutations from './mutations';


Vue.use(Vuex);

const state = {
  roomId: '',
  menu: {
    showSidebar: false,
  },
  user: {},
  members: [],
  rooms: [],
  messages: [],
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});
