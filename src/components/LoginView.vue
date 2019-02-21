<template>
  <div class="c-login-control">
    <div v-if="isSignOut" key="logout">
      <button class="btn-login" type="button" @click="doLogin">ログイン</button>
    </div>
    <div v-else key="login">
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
            const { uid, displayName } = u;
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
