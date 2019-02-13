<template>
  <header class="c-header">
    <div class="c-header-wrapper">
      <div class="c-app-name">Oyaji-Chat</div>
      <div class="c-login-control">
        <div v-if="uid" key="login">
          {{ userName }}
          <button class="btn-login" type="button" @click="doLogout">ログアウト</button>
        </div>
        <div v-else key="logout">
          <button class="btn-logout" type="button" @click="doLogin">ログイン</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ChatRoomHeader',
  props: {
    uid: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  methods: {
    doLogout() {
      this.$emit('logout');
    },
    doLogin() {
      this.$emit('login');
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
</style>
