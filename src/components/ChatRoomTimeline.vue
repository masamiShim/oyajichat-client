<template>
  <main class="c-chat-body">
    <div v-for="item in chats" :key="item.key">
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
</template>

<script>
export default {
  name: 'ChatRoomTimeline',
  props: {
    chats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
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
</style>
