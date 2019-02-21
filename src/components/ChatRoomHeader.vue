<template>
  <header class="c-header">
    <div class="c-header-wrapper">
      <div class="c-app-name">Oyaji-Chat</div>
      <ChatRoomMenu />
    </div>
  </header>
</template>

<script>
import ChatRoomMenu from '@/components/ChatRoomMenu';

export default {
  name: 'ChatRoomHeader',
  components: { ChatRoomMenu },
};
</script>

<style scoped>
  .c-header {
    color: white;
    display: flex;
    justify-content: space-between;
    background-color: slateblue;
    padding: 20px;
    height: 10vh;
    min-height: 75px;
    box-sizing: border-box;
  }

  .c-header-wrapper {
    width: 50%;
    display: inline-flex;
    line-height: 5vh;
    min-height: 5vh;
    margin: 0 auto;
  }

  .c-app-name {
    width: 100%;
    text-align: left;
  }

</style>
