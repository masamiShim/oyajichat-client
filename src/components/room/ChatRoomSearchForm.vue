<template>
  <div class="search-area-wrapper">
    <div class="search-area">
      <span>
        <i class="fas fa-search input-icon-label"></i>
        <input class="search-input"
               type="text"
               v-model="inputVal"
               placeholder="検索"
               @keyup="doSearch" />
      </span>
      <router-link class="button-primary" to="/room/create">
        作成
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoomSearchForm',
  data() {
    return {
      inputVal: '',
    };
  },
  methods: {
    doSearch(e) {
      const val = e.target.value;
      this.$emit('search', val);
    },
  },
};
</script>

<style scoped>
  .search-area-wrapper {
  }

  .search-area {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    margin: auto auto;
    margin: 2.5vh auto;
    width: 60%;
    min-width: 300px;
    max-width: 400px;
  }

  @media (min-width: 1024px) {
    .search-area {
      width: 50%;
    }
  }

  .search-input {
    padding: 1em 1em 1em 2.5em;
    border-radius: 15px;
    border: 1px solid #ababab;
  }
  .input-icon-label {
    position:relative;
    left: 2em;
  }


  .button-primary {
    padding: 10px 20px;
    border-radius: 5px;
    border:1px solid #5680CB;
    background-color: #5680CB;
    color: white;
    text-decoration: none;
  }

  .button-primary:hover {
    background-color: #699DF9;
  }

</style>
