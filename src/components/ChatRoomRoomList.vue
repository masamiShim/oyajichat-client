<template>
  <div>
    <div v-if="rooms.length > 0">
      <ul>
        <li v-for="room in rooms" :key="room.id">
          {{ room.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      お部屋Nothing
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChatRoomRoomList',
  props: {
    rooms: {
      type: Array,
    },
  },
  computed: mapState({
    rooms: state => state.rooms,
  }),


};
</script>

<style scoped>

</style>
