<template>
  <div class="post-image-list-wrapper">
    <ul class="post-image-list">
      <li v-for="image in images" :key="image.id" class="post-image-item">
        <img class="post-image-item__image" :src="image.src" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChatRoomPostImageListView',
  computed: mapState({
    images: state => state.images,
  }),
  created() {
    this.$store.dispatch('fetchImages');
  },
};
</script>

<style scoped>
  .post-image-list-wrapper {
    width: 90%;
    margin: 5vh auto;
    overflow: hidden;
  }
  .post-image-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    float: left;
    flex-wrap: wrap;
  }
  .post-image-item {
    width: 25%;
    box-sizing: border-box;
  }
  .post-image-item__image {
    width: 100%;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .post-image-item__image:not(last-child){
    margin-bottom: 1em;
  }

</style>
