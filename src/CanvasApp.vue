<template>
  <piechart @click="handleClick" :data="state.data" :x="200" :y="200" :r="200"></piechart>
</template>
<script>
// 自定义渲染器类似taro编译跨端的方式，vdom最终编译成什么样的真实dom全由自定义渲染器控制
import { reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      data: [
        { name: "大专", count: 200, color: "brown" },
        { name: "本科", count: 300, color: "yellow" },
        { name: "硕士", count: 100, color: "pink" },
        { name: "博士", count: 50, color: "skyblue" },
      ],
    });
    function handleClick() {
      state.data.push({ name: "其他", count: 30, color: "orange" });
    }
    return {
      state,
      handleClick,
    };
  },
};
</script>