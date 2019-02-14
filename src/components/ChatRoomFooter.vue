<template>
  <footer class="c-footer">
    <form action="" @submit.prevent="doSend" class="c-form-message">
          <textarea
            class="input-text-form"
            v-model="input"
            :disabled="!uid"
            @keydown.enter.shift.exact.prevent="doSend">
          </textarea>
      <button class="c-btn-send"
              type="submit"
              :disabled="!uid"
      >Send
      </button>
    </form>
  </footer>
</template>

<script>
export default {
  name: 'ChatRoomFooter',
  props: {
    uid: {
      type: String,
    },
  },
  data() {
    return {
      input: '',
    };
  },
  methods: {
    doSend() {
      if (!this.input) {
        return;
      }

      const val = this.input;
      this.$emit('send', val);

      this.input = '';
    },
  },
};
</script>

<style scoped>

  .c-footer {
    position: absolute;
    bottom: 0;
    height: 50px;
    background-color: #ababab;
    width: 100%;
    padding: 20px 0;
  }

  .input-text-form {
    width: 100%;
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

  .c-btn-send {
    border: none;
    background-color: #565656;
    padding: 10px 20px;
    border-radius: 15px;
    color: #efefef;
  }
</style>
