<template>
  <div>
    <ChatRoomTimeline :chats="chat"/>
    <ChatRoomFooter :uid="user.uid"
                    @send="doSend"/>
  </div>
</template>

<script>

import firebase from 'firebase';
import db from '@/firebaseInit';
import ChatRoomFooter from '@/components/ChatRoomFooter';
import ChatRoomTimeline from '@/components/ChatRoomTimeline';

export default {
  name: 'ChatRoomView',
  components: { ChatRoomTimeline, ChatRoomFooter },
  data() {
    return {
      user: {},
      chat: [],
    };
  },
  created() {
    firebase.auth()
      .onAuthStateChanged((user) => {
        // login状態であればuserが取れる
        this.user = user || {};

        // isMyMessageはmessageとuser.displayNameかなんかと比較
        if (user) {
          this.$store.dispatch('fetchMessage');
        } else {
          // message変更時のハンドラを解除
          db.collection('message')
            .limitToLast(10)
            .on('child_added', this.childAdded);
        }
      });
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    childAdd(snap) {
      const message = snap.val();
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message,
      });
      this.scrollBottom();
    },
    doSend(payload) {
      if (this.user.uid) {
        db.collection('message')
          .add({
            message: payload,
            name: this.user.displayName,
            image: this.user.photoURL,
          })
          .then(() => {
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};

</script>

<style scoped>
</style>
