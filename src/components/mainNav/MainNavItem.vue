<template>
  <div class="navItem">
    <div class="wrapper">
      <div class="nav_title">
        <img :src="nav_img" alt="" />
        <span>{{ nav_title }}</span>
      </div>
      <div
        class="nav_item"
        v-for="(item, index) in nav_items"
        :path="nav_paths[index]"
        :key="item"
        @click="itemClick(index)"
        :class="{ active: isActive(nav_paths[index]) }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainNavItem",
  props: {
    nav_title: {
      type: String,
      default: "",
    },
    nav_img: {
      type: String,
      default: "",
    },
    nav_items: {
      type: Array,
      default() {
        return [];
      },
    },
    nav_paths: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.$router.push(this.nav_paths[index]);
    },
    isActive(path) {
      return this.$route.path.indexOf(path) != -1;
    },
  },
  computed: {},
};
</script>

<style scoped>
.nav_title {
  height: 32px;
  line-height: 32px;
  margin-top: 54px;
  margin-left: 41px;
}
.nav_title span {
  display: inline-block;
  margin-left: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.nav_title img {
  vertical-align: middle;
  width: 32px;
}
.nav_item {
  margin-left: 94px;
  margin-top: 40px;
  width: 64px;
  height: 17px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.nav_item.active {
  margin-left: 57px;
  margin-top: 18px;
  width: 173px;
  height: 47px;
  line-height: 47px;
  text-indent: 37px;
  background: #ff8900;
  border-radius: 24px 0px 0px 24px;
  font-size: 18px;
  color: #fffefe;
}
</style>