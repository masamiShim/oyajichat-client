import Vue from 'vue';
import Router from 'vue-router';
import ChatRoomView from '@/components/ChatRoomView';
import ChatRoomCreator from '@/components/room/ChatRoomCreator';
import ChatRoomRoomList from '@/components/room/ChatRoomRoomList';
import ChatRoomPostImageView from '@/components/postImage/ChatRoomPostImageView';
import ChatRoomPostImageListView from '@/components/postImage/ChatRoomPostImageListView';

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
    {
      path: '/room/list',
      name: 'ChatRoomRoomList',
      component: ChatRoomRoomList,
    },
    {
      path: '/room/:roomId',
      name: 'ChatRoomView',
      component: ChatRoomView,
    },
    {
      path: '/image/post',
      name: 'ChatRoomPostImageView',
      component: ChatRoomPostImageView,
    },
    {
      path: '/image/list',
      name: 'ChatRoomPostImageListView',
      component: ChatRoomPostImageListView,
    },
  ],
});
