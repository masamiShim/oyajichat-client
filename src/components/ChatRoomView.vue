<template>
  <div>
    <ChatRoomHeader :uid="user.uid"
                    :userName="user.displayName"
                    @login="doLogin"
                    @logout="doLogout"/>
    <ChatRoomTimeline :chats="chat"/>
    <ChatRoomFooter :uid="user.uid"
                    @send="doSend"/>
  </div>
</template>

<script>

import firebase from 'firebase';
import db from '@/firebaseInit';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import ChatRoomFooter from '@/components/ChatRoomFooter';
import ChatRoomTimeline from '@/components/ChatRoomTimeline';

export default {
  name: 'ChatRoomView',
  components: { ChatRoomTimeline, ChatRoomFooter, ChatRoomHeader },
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
          this.chat = [{
            name: 'freitech',
            image: 'image-sample',
            message: 'hello',
            isMyMessage: true,
          },
          {
            name: 'other-user',
            image: 'image-sample',
            message: 'other-hello',
            isMyMessage: false,
          }];
          // message変更時のハンドラを登録
          db.collection('message')
            .limit(10)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                const row = doc.data();
                this.chat.push({
                  name: row.name,
                  image: row.image,
                  message: row.message,
                  isMyMessage: row.name === user.displayName,
                });
              });
            })
            .catch((error) => {
              console.error(error);
            })
            .on('child_added', this.childAdded);
        } else {
          // message変更時のハンドラを解除
          db.collection('message')
            .limitToLast(10)
            .on('child_added', this.childAdded);
        }
      });
  },
  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth()
        .signInWithPopup(provider);
    },
    doLogout() {
      firebase.auth()
        .signOut();
    },
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
