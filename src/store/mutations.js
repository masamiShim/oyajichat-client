import * as types from './mutations-types';

export default {
  [types.FETCH_ROOMS](state, room) {
    state.rooms = [...room];
  },
  [types.FETCH_MESSAGES](state, mes) {
    state.messages = [...mes];
  },
  [types.SEND_MESSAGE](state, mes) {
    state.messages.push(mes);
  },
  [types.FETCH_MEMBERS](state, mems) {
    state.members.push(mems);
  },
  [types.CREATE_ROOM](state, room) {
    state.rooms.push(room);
  },
  [types.STORE_USER](state, payload) {
    state.user = {
      uid: payload.uid,
      displayName: payload.displayName
    };
  },
  [types.REMOVE_USER](state) {
    state.user = {};
  },
  [types.POST_IMAGE](state, payload) {
    state.images.push(payload.image);
  },
  [types.FETCH_IMAGE](state, images) {
    state.images = [...images];
  },
};
