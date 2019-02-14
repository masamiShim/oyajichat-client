<template>
  <div id="app">
    <ChatRoomHeader :uid="user.uid"
                    :userName="user.displayName"
                    @login="doLogin"
                    @logout="doLogout"/>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
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
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
