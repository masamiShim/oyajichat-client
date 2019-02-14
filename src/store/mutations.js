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
};
