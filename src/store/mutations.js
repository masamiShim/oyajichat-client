import * as types from './mutations-types';

export default {
  [types.TOGGLE_SIDEBAR](state, payload) {
    state.showSidebar = payload;
  },
  [types.FETCH_ROOMS](state, rooms) {
    state.rooms = rooms;
  },
  [types.FETCH_MESSAGES](state, messages) {
    state.messages = messages;
  },
  [types.FETCH_MEMBERS](state, members) {
    state.members = members;
  },
  [types.STORE_USER](state, user) {
    state.user = user;
  },
  [types.REMOVE_USER](state) {
    state.user = {};
  },
};
