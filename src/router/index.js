import Vue from 'vue';
import Router from 'vue-router';
import ChatRoomView from '@/components/ChatRoomView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatRoomView',
      component: ChatRoomView,
    },
  ],
});
