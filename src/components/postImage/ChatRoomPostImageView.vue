<template>
  <div>
    <div>{{ error }}</div>
    <div>
    image投稿するよ
    </div>
    <img v-show="uploadedImage" :src="uploadedImage" alt="">
    <input type="file"
           ref="image"
           accept="image/*"
           @change="onFileChange">
    <button type="button" @click="registerImage">投稿</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'ChatRoomPostImageView',
  data() {
    return {
      uploadedImage: '',
      imageFile: '',
      imageName: '',
      error: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
        this.imageFile = file;
        this.imageName = file.name;
      };
      reader.readAsDataURL(file);
    },
    registerImage() {
      const storageRef = firebase.storage().ref();
      const mountainsRef = storageRef.child(`images/${this.user.displayName}/${this.imageName}`);
      mountainsRef.put(this.imageFile)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadUrl) => {
              this.uploadedImage = downloadUrl;
              this.$store.dispatch('postImage', this.uploadedImage);
              this.imageFile = '';
              this.imageName = '';
              this.uploadedImage = '';
            })
            .catch((err) => {
              this.error = err;
            });
        });
    },
  },
};
</script>

<style scoped>

</style>
