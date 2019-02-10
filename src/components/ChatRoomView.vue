<template>
    <div>
      <header class="c-header">
        <div class="c-header-wrapper">
          <div class="c-app-name">Oyaji-Chat</div>
          <div class="c-login-control">
            <div v-if="user.uid" key="login">
              {{ user.displayName }}
              <button class="btn-login" type="button" @click="doLogout">ログアウト</button>
            </div>
            <div v-else key="logout">
              <button class="btn-logout" type="button" @click="doLogin">ログイン</button>
            </div>
          </div>
        </div>
      </header>
      <main class="c-chat-body">
        <div v-for="item in chat" :key="item.key">
          <div class="chat-wrapper">
            <div
                 class="chat-message"
                 :class="item.isMyMessage ? 'my-chat' : 'other-chat'"
            >
              <span>{{ item.message }}</span>
            </div>
            <div :class="item.isMyMessage ? 'c-my-chat__label' : 'c-other-chat__label'">
              {{ item.name }}
            </div>
          </div>
        </div>
      </main>
      <footer class="c-footer">
        <form action="" @submit.prevent = "doSend" class="c-form-message">
          <textarea
            class="input-text-form"
            v-model="input"
            :disabled="!user.uid"
            @keydown.enter.shift.exact.prevent="doSend">
          </textarea>
          <button class="c-btn-send"
                  type="submit"
                  :disabled="!user.uid"
          >Send</button>
        </form>
      </footer>
    </div>
</template>

<script>

import firebase from 'firebase';
import db from '@/firebaseInit';

export default {
  name: 'ChatRoomView',
  data() {
    return {
      user: {},
      chat: [],
      input: '',
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
          /*         db.collection('message')
            .limit(10)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                this.chat.push(doc.data());
              });
            })
            .catch((error) => {
              console.error(error);
            })
            .on('child_added', this.childAdded);
*/
        } else {
          // message変更時のハンドラを解除
          /*          db.collection('message')
            .limitToLast(10)
            .on('child_added', this.childAdded);
*/
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
    doSend() {
      if (this.user.uid && this.input.length) {
        db.collection('message')
          .add({
            message: this.input,
            name: this.user.displayName,
            image: this.user.photoURL,
          }).then(() => {
            this.input = '';
          }).catch((err) => {
            console.error(err);
          });
      }
    },
  },
};

</script>

<style scoped>
  .c-header{
    color: white;
    display: flex;
    justify-content: space-between;
    background-color: #ababab;
    padding: 20px;
    height: 80px;
    box-sizing: border-box;
  }
  .c-header-wrapper {
    width: 50%;
    margin: 0 auto;
  }

  .c-app-name{
    width: 100%;
    text-align: left;
  }

  .c-login-control{
    text-align: right;
  }

  .btn-login {
    border: none;
    background-color: #565656;
    padding: 10px 20px;
    border-radius: 15px;
    color: #efefef;
  }
  .btn-logout {
    border: none;
    background-color: #565656;
    padding: 10px 20px;
    border-radius: 15px;
    color: #efefef;
  }
  .c-btn-send {
    border: none;
    background-color: #565656;
    padding: 10px 20px;
    border-radius: 15px;
    color: #efefef;
  }

  .c-chat-body {
    padding: 20px 10px;
  }

  .c-chat-label {
    position:relative;
    top: 50px;
  }

  .chat-wrapper {
   min-width: 100%;
  }

  .chat-message {
    position: relative;
    border: 1px solid black;
    width: 30%;
    padding: 10px 20px;
    text-align: left;
    border-radius: 20px;
  }

  .my-chat {
    margin-right: auto;
    margin-left: 0;
    background-color: beige;
  }

  .other-chat {
    margin-right: 0;
    margin-left: auto;
    background-color: lightcyan;
  }

  .c-footer {
    position: absolute;
    bottom: 0;
    height: 50px;
    background-color: #ababab;
    width: 100%;
    padding: 20px 0;
  }

  .c-my-chat__label {
    text-align: left;
    margin-top: .2em;
    padding-left: .5em;
  }

  .c-other-chat__label {
    text-align: right;
    margin-top: .2em;
    padding-right: .5em;
  }
  .input-text-form {
    width:  100%;
    height: 100%;
    padding: 1em .2em .2em 1em;
    font-size: 1em;
    border-radius: 10px;
    resize: none;
    overflow: hidden;
  }
  .c-form-message {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }

</style>
