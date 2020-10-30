<template>
  <div>{{msg2}}</div>
  <p>{{counter}}</p>
  <p>{{doubleCounter}}</p>
  <p ref="desc">dom ref</p>
</template>

<script>
import {
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
export default {
  setup() {
    // counter相关
    const { counter, doubleCounter } = useCounter();
    // 其他数据，单值响应式
    const msg2 = ref("Composition Demo");
    // dom元素引用
    const desc = ref(null);
    // watch监听器
    // watch(() => data.counter, (val, oldVal) => { // 使用data的时候首个传参用箭头函数，现在用外部导入的方法，直接用变量名称即可
    watch(counter, (val, oldVal) => {
      const p = desc.value;
      p.textContent = `dom watch: from ${oldVal} to ${val}`;
    });
    return { counter, doubleCounter, msg2, desc };
  },
};
function useCounter() {
  const data = reactive({
    counter: 0,
    doubleCounter: computed(() => data.counter * 2),
  });
  let timer;
  onMounted(() => {
    console.log("mounted!");
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });
  onUpdated(() => {
    console.log("updated!");
  });
  onUnmounted(() => {
    console.log("unmounted!");
    clearInterval(timer);
  });
  return toRefs(data);
}
</script>

<style>
</style>