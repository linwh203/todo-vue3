<template>
  <div>
    About
    <div @click="$store.commit('add')">
      store state: {{$store.state.count}}
    </div>
    <router-link to='/about/info'>INFO</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>