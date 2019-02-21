<template>
  <div>
    <ChatRoomSearchForm @search="searchRoom" />
    <div class="room-list-wrapper">
      <div class="loader" v-if="loading">loading...</div>
      <div v-if="filteredRooms.length > 0">
        <ul class="room-list">
          <li class="room-item"
              v-for="room in filteredRooms" :key="room.id"
              @click="routing(room.id)">
            {{ room.name }}
          </li>
        </ul>
      </div>
      <div v-else>
        お部屋Nothing
      </div>
    </div>
  </div>
</template>

<script>
import ChatRoomSearchForm from '@/components/room/ChatRoomSearchForm';

export default {
  name: 'ChatRoomRoomList',
  components: { ChatRoomSearchForm },
  data() {
    return {
      loading: false,
      filteredRooms: this.$store.state.rooms,
    };
  },
  methods: {
    routing(id) {
      this.$router.push({ path: `/room/${id}` });
    },
    searchRoom(inputText) {
      this.filteredRooms = this.$store.getters.filterRooms(inputText);
    },
  },
  created() {
    this.$store.dispatch('fetchRooms');
  },

};
</script>

<style scoped>
  .room-list-wrapper {

  }
  .room-list{
    list-style: none;
    margin: 0;
    padding-left: 0;
    background-color: #ababab;
  }
  .room-item{
    padding: 20px 0;
    border-bottom: 1px solid lightcyan;
  }
  .room-item:hover{
    cursor: pointer;
    background-color: #cdcdcd;
  }
</style>
