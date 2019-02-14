import * as types from './mutations-types';

export default {
  toggleSidebar: ({ commit, state }) => {
    commit(types.TOGGLE_SIDEBAR, !state.showSidebar);
  },
  fetchRooms: ({ commit }) => {
    // FIXME: API
    const rooms = [{
      host: 'freitech',
      members: ['user1', 'user2'],
    }];
    commit(types.FETCH_ROOMS, rooms);
  },
  fetchMessage: ({ commit }) => {
    // FIXME: API
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
};
