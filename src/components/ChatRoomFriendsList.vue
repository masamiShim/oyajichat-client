<template>
  <div>
    <div v-show="selected.length < 1">お友達選んで</div>
    <div v-if="filteredMembers.length > 0">
      <ul>
        <li v-for="member in filteredMembers" :key="member.id">
          <input :id="member.name" type="checkbox"
                 :checked="selected.indexOf(member.name) > 0"
                 @click="doSelect(member.name)">
          <label :for="member.name">{{ member.name }}</label>
        </li>
      </ul>
    </div>
    <div v-else>
      そんな友達いーひんよ
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoomFriendsList',
  props: {
    selected: {
      type: Array,
    },
    filteredMembers: {
      type: Array,
    },
  },
  methods: {
    doSelect(name) {
      this.$emit('selected', name);
    },
  },
};
</script>

<style scoped>

</style>
