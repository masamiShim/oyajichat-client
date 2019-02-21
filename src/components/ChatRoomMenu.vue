<template>
  <aside class="sidebar-navigation-wrapper">
    <nav v-if="showMenu" class="sidebar-navigation">
      <div class="overlay" @click="hide"></div>
      <ul class="c-menu l-menu">
        <li class="menu-item"  @click="routing('/room/list')">
          <i class="fas fa-home"></i><span class="menu-text">CreateRoom</span></li>
        <li class="menu-item" @click="routing('/friend/search')">
          <i class="fas fa-search"></i><span class="menu-text">SearchMember</span></li>
        <li class="menu-item" @click="routing('/image/post')">
          <i class="far fa-images"></i>
          <span class="menu-text">PostImage</span>
        </li>
        <li class="menu-item" @click="routing('/image/list')">
          <i class="far fa-images"></i>
          <span class="menu-text">ImageList</span>
        </li>
      </ul>
    </nav>
    <span @click="show" class="menu-closed">
      <i class="fas fa-bars fa-2x"></i></span>
  </aside>
</template>


<script>
export default {
  name: 'ChatRoomMenu',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    show() {
      this.showMenu = true;
    },
    hide() {
      this.showMenu = false;
    },
    routing(p) {
      this.$nextTick(() => {
        this.$router.push({ path: p });
        this.hide();
      });
    },
  },
};
</script>

<style scoped>
  .menu-text{
    margin-left: .8em;
  }
  .menu-closed:hover{
    cursor: pointer;
  }
  .sidebar-navigation-wrapper {
    position: relative;
  }
  .sidebar-navigation{
    position: absolute;
    left:0;
    z-index: 201;
  }
  .c-menu {
    padding: 0;
    width: 30vw;
    height: 90vh;
    overflow: hidden;
    list-style: none;
    font-size: .9em;
    text-align: left;
    background-color: slateblue;
    opacity: .7;
  }
  /* メニューのcoverレスポンシブ */
  @media(max-width: 760px)  {
    .c-menu {
      width: 60vw;
    }
  }
  @media(max-width: 480px)  {
    .c-menu {
      width: 80vw;
    }
  }
  .l-menu {
    position: fixed;
    margin: 0;
    top: 75px;
    left:0;
    z-index: 102;
  }
  .menu-item {
    padding: 20px;
    color: #efefef;
  }
  .menu-item:hover {
    letter-spacing: .1em;
    cursor: pointer;
    background-color: rgba(123, 109, 238, 0.48);
  }
  .overlay {
    position:fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: black;
    opacity: .5;
    height: 100vh;
    width: 100vw;
  }
</style>
