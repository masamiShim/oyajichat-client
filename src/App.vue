<template>
  <div id="app">
    <ChatRoomHeader @login="doLogin"
                    @logout="doLogout"/>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';
import ChatRoomHeader from '@/components/ChatRoomHeader';


export default {
  name: 'App',
  components: { ChatRoomHeader },
  computed: mapState({
    user: state => state.user,
  }),
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
  created() {
    firebase.auth()
      .onAuthStateChanged((_user) => {
        if (!this.user) {
          this.$store.dispatch('storeUser', _user);
        } else {
          this.$store.dispatch('removeUser');
        }
      });
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
