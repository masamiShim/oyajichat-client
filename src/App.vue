<template>
  <div id="app">
    <ChatRoomHeader />
    <LoginView v-if="isLogout" />
    <router-view v-else />
  </div>
</template>

<script>
import ChatRoomHeader from '@/components/ChatRoomHeader';
import LoginView from '@/components/LoginView';


export default {
  name: 'App',
  components: { LoginView, ChatRoomHeader },
  computed: {
    isLogout() {
      return this.$store.getters.unAuthorized;
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
