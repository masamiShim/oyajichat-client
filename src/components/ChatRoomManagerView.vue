<template>
  <div>
    <ChatRoomList/>
    <ChatRoomFriendsList/>
  </div>
</template>

<script>
import ChatRoomList from '@/components/ChatRoomRoomList';

export default {
  name: 'ChatRoomManagerView',
  components: [ChatRoomList],
};
</script>

<style scoped>

</style>
