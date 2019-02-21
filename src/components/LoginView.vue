<template>
  <div class="c-login-control">
    <div v-show="isSignOut" key="login">
      <button class="btn-login" type="button" @click="doAnonymousLogin">匿名ログイン</button>
      <button class="btn-login" type="button" @click="doLogin">ログイン</button>
    </div>
    <div v-show="!isSignOut" key="logout">
      <button class="btn-logout" type="button" @click="doLogout">ログアウト</button>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase';

export default {
  name: 'LoginView',
  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth()
        .signInWithPopup(provider);
    },
    doAnonymousLogin() {
      firebase.auth().signInAnonymously();
    },
    doLogout() {
      firebase.auth().signOut();
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isSignOut() {
      return this.$store.getters.unAuthorized;
    },
  },
  created() {
    firebase.auth()
      .onAuthStateChanged((_user) => {
        this.$nextTick(() => {
          const u = _user || {};
          if (Object.keys(u).length < 1) {
            this.$store.dispatch('removeUser');
          } else if (Object.keys(this.user).length < 1) {
            const uid = u.uid;
            const displayName = u.displayName || 'anonymous';
            this.$store.dispatch('storeUser', { uid, displayName });
          }
        });
      });
  },
};
</script>

<style scoped>
  .c-login-control {
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
</style>
