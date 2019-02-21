<template>
  <div class="chat-body-wrapper">
    <div class="chat-room-name">{{room.name}}</div>
    <ChatRoomTimeline :chats="chat"/>
    <ChatRoomFooter :uid="user.uid"
                    @send="doSend"/>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import ChatRoomFooter from '@/components/ChatRoomFooter';
import ChatRoomTimeline from '@/components/ChatRoomTimeline';

export default {
  name: 'ChatRoomView',
  components: { ChatRoomTimeline, ChatRoomFooter },
  data() {
    return {
      roomId: '',
    };
  },
  computed: mapState({
    user: state => state.user,
    chat: state => state.messages,
    room() {
      return this.$store.getters.getRoom(this.roomId);
    },
  }),
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    doSend(_message) {
      this.$store.dispatch('sendMessage', { message: _message, roomId: this.roomId });
      this.$store.dispatch('fetchRoom', { message: _message, roomId: this.roomId });
      this.scrollBottom();
    },
  },
  mounted() {
    this.roomId = this.$route.params.roomId;
    this.$store.dispatch('fetchMessage', { roomId: this.roomId });
    this.scrollBottom();
  },
};

</script>

<style scoped>
  .chat-body-wrapper {
    z-index: 10;
  }
</style>
