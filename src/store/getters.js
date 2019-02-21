import { Room } from '@/api/index';

export default {
  getUser: state => state.user,
  unAuthorized: state => !state.user.uid,
  filterRooms: state => (filterText) => {
    if (!filterText) {
      return state.rooms;
    }
    return state.rooms.filter(r => r.name.includes(filterText));
  },
  getRoom: state => (roomId) => {
    if (!roomId) {
      return state.rooms;
    }
    return Room.fetchByRoomId(roomId).then(room => room);
  },
};
