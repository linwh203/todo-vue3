<template>
  <div @click="$emit('click')">
    使用emits管理自定义事件的派发：click me
  </div>
  <div @click="$emit('my-click')">
    使用emits管理自定义事件的派发：my-click me
  </div>
</template>

<script>
export default {
  // emits 作用
  // 1.原生click+自定义click事件会派发2次，现在使用emit管理后click仅被认为自定义事件，只会触发一次
  // 2.更好的指示组件工作方式
  // 3.对象形式事件校验
  emits: ["click", "my-click"],
};
</script>

<style>
</style>