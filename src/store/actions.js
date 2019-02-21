import { Room, Message, PostImage } from '@/api/index';
import * as types from './mutations-types';

export default {
  fetchRooms: ({ commit, state }) => {
    Room.fetch(state.user.uid)
      .then((rooms) => {
        commit(types.FETCH_ROOMS, rooms);
      });
  },
  async createRoom({ commit, state }, payload) {
    const room = {
      name: payload,
      userId: state.user.uid,
      friends: [],
    };
    const result = await Room.register(room);
    commit(types.CREATE_ROOM, result);
    return result;
  },
  async fetchMessage({ commit, state }, payload) {
    const messages = await Message.fetch(payload.roomId, state.user.uid);
    commit(types.FETCH_MESSAGES, messages);
  },
  async sendMessage({ commit, state }, payload) {
    const message = await Message.register({ userId: state.user.uid, ...payload });
    commit(types.SEND_MESSAGE, { isMyMessage: true, ...message });
  },
  storeUser: ({ commit }, payload) => {
    commit(types.STORE_USER, payload);
  },
  removeUser: ({ commit }) => {
    commit(types.REMOVE_USER);
  },
  postImage: ({ commit, state }, data) => {
    const imageData = {
      userId: state.user.uid,
      image: data,
    };
    PostImage.register(imageData)
      .then((ret) => {
        commit(types.POST_IMAGE, { image: ret });
      });
  },
  async fetchImages({ commit, state }) {
    const images = await PostImage.fetch(state.user.uid);
    commit(types.FETCH_IMAGE, images);
  },
};
