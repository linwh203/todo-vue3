<template>
  <div>Teleport</div>
  <button @click="modalOpen=true">Open Modal</button>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <h3>hehe</h3>
      <button @click="modalOpen=false">close</button>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>