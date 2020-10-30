<template>
  <div :class="{active: isActive}" @click="navigate">
    {{route.name}}
  </div>
</template>

<script>
// 对路由对象做处理
import { RouterLink, useLink } from "vue-router";
export default {
  props: {
    ...RouterLink.props,
    activeClass: String,
  },
  setup(props) {
    // 获取routerLink内部的属性和方法
    const { route, href, isActive, isExactActive, navigate } = useLink(props);
    console.log(route, href, isActive, isExactActive, navigate);
    return {
      route,
      isActive,
      navigate,
    };
  },
};
</script>

<style  scoped>
.active {
  background-color: tomato;
}
</style>