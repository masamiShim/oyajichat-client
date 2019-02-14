import * as types from './mutations-types';

export default {
  toggleSidebar: ({ commit, state }) => {
    commit(types.TOGGLE_SIDEBAR, !state.showSidebar);
  },
  fetchRooms: ({ commit }) => {
    // FIXME: FireStorage
    const rooms = [{
      id: 'room1',
      host: 'freitech',
      members: ['user1', 'user2'],
    }];
    commit(types.FETCH_ROOMS, rooms);
  },
  fetchMessage: ({ commit }) => {
    // FIXME: FireStorage
    const messages = [{
      name: 'freitech',
      message: 'hogehogefuga',
    },
    {
      name: 'other-user',
      message: 'functionalHoge!!!!!',
    }];
    commit(types.FETCH_MESSAGES, messages);
  },
  sendMessage: ({ commit, payload }) => {
    const message = {
      key: payload.key,
      name: payload.name,
      image: payload.image,
      message: payload.message,
    };
    commit(types.SEND_MESSAGE, message);
  },
  storeUser: ({ commit, payload }) => {
    commit(types.STORE_USER, payload);
  },
  removeUser: ({ commit }) => {
    commit(types.REMOVE_USER);
  },
};
