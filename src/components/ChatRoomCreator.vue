<template>
  <div class="creator-wrapper">
    <transition name="success-message">
      <div v-if="success">お部屋つくったぞい</div>
    </transition>
    <div>
      <label>部屋名</label>
      <input type="text" v-model="roomName" @keydown.enter.exact.alt="doCreate">
    </div>
    <div v-show="roomName.length < 1">部屋名決めてね</div>
    <div>
      <label>お友達</label>
      <input type="text" v-model="memberName">
    </div>
    <ChatRoomFriendsList
      :selected="selected"
      :filteredMembers="filteredMembers"
      @selected="doSelect" />
    <ChatRoomRoomList
      :rooms="rooms"
    />
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebaseInit';
import ChatRoomFriendsList from './ChatRoomFriendsList';
import ChatRoomRoomList from './ChatRoomRoomList';

export default {
  name: 'ChatRoomCreator',
  components: { ChatRoomRoomList, ChatRoomFriendsList },
  data() {
    return {
      roomName: '',
      memberName: '',
      user: {},
      rooms: [],
      members: [
        { name: 'aaaaaa', id: 'id1' },
        { name: 'bbbbbb', id: 'id2' },
        { name: 'cccccc', id: 'id3' },
        { name: 'dddddd', id: 'id4' },
        { name: 'eeeeee', id: 'id5' },
      ],
      selected: [],
      success: false,
      // なんかあった気がする
    };
  },
  computed: {
    filteredMembers() {
      return this.members.filter(m => m.name.includes(this.memberName) > 0) || [];
    },
  },
  methods: {
    doCreate() {
      if (this.user.uid
        && this.roomName
        && this.selected.length > 0) {
        db.collection('room')
          .add({
            name: this.roomName,
            host: this.user.displayName,
            members: this.selected,
          })
          .then(() => {
            this.rooms.push({
              name: this.roomName,
              host: this.user.displayName,
              members: this.selected,
            });
            this.roomName = '';
            this.selected = [];
            this.memberName = '';
            this.success = true;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    childAdd(snap) {
      const room = snap.val();
      this.rooms.push({
        key: snap.key,
        ...room,
      });
    },
    doSelect(val) {
      if (this.selected.indexOf(val) < 0) {
        this.selected.push(val);
      } else {
        this.selected = this.selected.filter(s => s !== val);
      }
    },
  },
  created() {
    firebase.auth()
      .onAuthStateChanged((user) => {
        // login状態であればuserが取れる
        this.user = user || {};

        // isMyMessageはmessageとuser.displayNameかなんかと比較
        if (user) {
          // message変更時のハンドラを登録
          db.collection('room')
            .where('host', '==', user.displayName)
            .limit(10)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                this.rooms.push(doc.data());
              });
            })
            .catch((error) => {
              console.error(error);
            })
            .on('child_added', this.childAdded);

          db.collection('member')
            .limit(10)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                this.members.push(doc.data());
              });
            });
        } else {
          // message変更時のハンドラを解除
          db.collection('room')
            .limitToLast(10)
            .on('child_added', this.childAdded);
        }
      });
  },
};
</script>

<style scoped>
.success-message-enter-active, .success-message-leave-active {
  transition: opacity .5s;
}
.success-message-enter, .success-message-leave {
  opacity: 0;
}
</style>
