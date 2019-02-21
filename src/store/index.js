import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const strict = false;

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
  images: [],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});
