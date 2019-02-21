<template>
  <div class="creator-wrapper">
    <transition name="success-message">
      <div v-if="success">お部屋つくったぞい</div>
    </transition>
    <transition name="success-message">
      <div v-if="error">
        部屋の作成に失敗しました。
        <span>
          {{ errMes }}
        </span>
      </div>
    </transition>
    <form class="form-area">
      <div class="form-input-label">
        <label for="roomName">部屋名</label>
      </div>
      <div  class="form-input-text">
        <input id="roomName"
               class="form-input"
               type="text"
               v-model="roomName"
               @keydown.enter.exact.alt="doCreate"
               placeholder="名前">
      </div>
      <span v-show="roomName.length < 1" class="error-text">部屋名決めてね</span>
      <ul class="button-list">
        <li class="button-list-item">
          <button type="text"
                  class="button-primary"
                  :class="roomName.length < 1 ? 'button-disabled' : ''"
                  :disabled="roomName.length < 1"
                  @click="doCreate">
            作成
          </button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChatRoomCreator',
  data() {
    return {
      error: false,
      errMes: '',
      roomName: '',
      success: false,
      // なんかあった気がする
    };
  },
  computed: mapState({
    rooms: state => state.rooms,
  }),
  methods: {
    doCreate() {
      if (!this.roomName) {
        return;
      }
      this.$store.dispatch('createRoom', this.roomName)
        .then((room) => {
          const { id } = room;
          console.log(this);
          this.$router.push(`/room/${id}`);
        }).catch((err) => {
          this.error = true;
          this.errMes = err;
        });
    },
  },
};
</script>

<style scoped>
  .creator-wrapper{
    margin-top: 5vh;
  }
  .form-area {
    width: 50%;
    margin: 0 auto;
    text-align: left;
  }
  .form-input-label {
    height: 2em;
  }
  .form-input-text {
    height: 3em;
  }
  .form-input {
    padding: 1em;
    border-radius: 15px;
    border: 1px solid #ababab;
  }
  .error-text {
    color: deeppink;
    min-width: 10em;
  }
  .success-message-enter-active, .success-message-leave-active {
    transition: opacity .5s;
  }

  .success-message-enter, .success-message-leave {
    opacity: 0;
  }
  .button-primary {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #5680CB;
    border:1px solid #5680CB;
    color: white;
    text-decoration: none;
  }

  .button-primary:hover {
    background-color: #699DF9;
  }

  .button-disabled {
    background-color: #565656;
    opacity: .5;
  }

  .button-disabled:hover {
    background-color: #565656;
    opacity: .5;
  }

  .button-list {
    list-style: none;
    border: 0;
    padding: 0;
  }

</style>
