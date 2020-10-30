<template>
  <ul>
    <!-- 使用route实例的方式 -->
    <NaviLink v-for="link in routerList" :key="link.path" :to='link.path'></NaviLink>
    <!-- 常规方式 -->
    <!-- <li v-for="link in routerList" :key="link.path">
      <router-link :to="link.path">{{link.label}}</router-link>
    </li> -->
  </ul>
</template>

<script>
import NaviLink from "./NaviLink.vue";

export default {
  components: {
    NaviLink,
  },
  data() {
    return {
      routerList: [
        { path: "/", label: "DASHBOARD" },
        { path: "/todos", label: "TODOS" },
        { path: "/hello", label: "HELLOWORLD" },
        { path: "/about", label: "ABOUT" },
      ],
    };
  },
};
</script>

<style scoped>
</style>