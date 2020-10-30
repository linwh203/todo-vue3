<template>
  <p class="filters">
    <span v-for="item in items" :key="item.value" @click="$emit('update:modelValue', item.value)"
      :class="{selected: modelValue === item.value}">{{item.label}}</span>
  </p>
</template>

<script>
export default {
  props: ["items", "modelValue"],
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.filters > span {
  margin: 0 20px;
  padding: 5px 10px;
  display: inline-block;
  border: 1px solid transparent;
}
.filters .selected {
  border-color: #333;
}
</style>