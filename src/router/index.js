import Vue from 'vue';
import Router from 'vue-router';
import ChatRoomView from '@/components/ChatRoomView';
import ChatRoomCreator from '@/components/ChatRoomCreator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatRoomView',
      component: ChatRoomView,
    },
    {
      path: '/room/create',
      name: 'ChatRoomCreator',
      component: ChatRoomCreator,
    },
  ],
});
