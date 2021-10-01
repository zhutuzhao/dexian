<template>
  <div class="nav">
    <main-nav-item
      v-for="item in navs"
      :key="item.title"
      :nav_title="item.title"
      :nav_items="item.items"
      :nav_img="item.img"
      :nav_paths="item.paths"
    />
  </div>
</template>

<script>
import MainNavItem from "./MainNavItem.vue";
export default {
  name: "MainNav",
  components: { MainNavItem },
  props: {
    navs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.nav {
  position: absolute;
  background-color: #fff;
  height: 900px;
  width: 230px;
  left: 0;
}
</style>