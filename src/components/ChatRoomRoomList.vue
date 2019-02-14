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
export default {
  name: 'ChatRoomRoomList',
  props: {
    rooms: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
