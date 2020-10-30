<template>
  <h1>{{ msg }}</h1>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <!-- Composition setup -->
  <Composition></Composition>
  <!-- Teleport Modal -->
  <ModalButton></ModalButton>
  <!-- component emits -->
  <Emits @click="onClick" @my-click="onClick"></Emits>
  <!-- custom render -->
  <p>custom render见CanvasApp.vue示例</p>
</template>

<script>
import Composition from "./Composition.vue";
import ModalButton from "./ModalButton.vue";
import Emits from "./Emits.vue";
export default {
  name: "HelloWorld",
  components: {
    Composition,
    ModalButton,
    Emits,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onClick() {
      console.log(123);
    },
  },
};
</script>
