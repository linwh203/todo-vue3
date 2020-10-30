<template>
  <!-- <img alt="Vue logo" height="1000px" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <!-- <Todos></Todos> -->
  <!-- store test 传统写法-->
  <div @click="$store.commit('add')">
    store state: {{$store.state.count}}
  </div>
  <!-- store test composition写法 -->
  <div @click="add">
    <!-- composition store state: {{count}} -->
    composition store state: {{state.count}}
  </div>
  <!-- <router-view v-slot="{Component}">
    <keep-alive>
      <transition>
        <component :is="Component" />
      </transition>
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/todos/Todos.vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
    Todos,
  },
  //composition方式使用store
  setup() {
    const store = useStore();
    console.log(store);
    return {
      // 不会跟随state改变，state为Proxy响应式，解构state内的值会失去响应式
      // count: store.state.count,
      // 可以使用toRef展开获得响应
      // ...toRefs(store.state)
      state: store.state,
      add() {
        store.commit("add");
      },
    };
  },
};
</script>
