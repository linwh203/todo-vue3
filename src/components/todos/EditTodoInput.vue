<template>
  <input type="text" :value="todoTitle" @input="onInputChange" v-bind="$attrs">
</template>

<script>
export default {
  props: {
    todoTitle: {
      // 默认叫modelValue, 可以在外部使用v-model:xxx来改变名称
      type: String,
      default: "",
    },
  },
  methods: {
    onInputChange(e) {
      this.$emit("update:todoTitle", e.target.value);
    },
  },
};
</script>

<style scoped>
</style>