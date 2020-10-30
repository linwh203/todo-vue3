<template>
  <li :class="{completed: todo.completed, editing: todo === editingTodo}">
    <!-- 编辑待办,利用自定义指令来autofocus -->
    <EditTodoInput class="edit" v-model:todo-title="todo.title" v-if="todo === editingTodo"
      v-todo-focus="todo === editingTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
      @keyup.esc="cancelEdit(todo)">
    </EditTodoInput>
    <div class="view" v-else>
      <!-- 绑定完成状态 -->
      <input type="checkbox" v-model="todo.completed">
      <label @dblclick="editTodo(todo)">{{todo.title}}:{{todo.completed}}</label>
      <button @click="removeTodo(todo)">x</button>
    </div>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    editingTodo: Object,
  },
  emits: ["remove-todo", "update:editingTodo"],
  setup(props, { emit }) {
    const state = reactive({
      beforeEditCache: "", // 保存编辑前的title
    });
    // 派发方法：setup解构第二个参数emit
    function removeTodo(todo) {
      emit("remove-todo", todo);
    }

    function doneEdit(todo) {
      emit("update:editingTodo", null);
    }
    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      emit("update:editingTodo", todo);
    }
    function cancelEdit(todo) {
      todo.title = state.beforeEditCache;
      emit("update:editingTodo", null);
    }

    return {
      ...toRefs(state),
      doneEdit,
      editTodo,
      cancelEdit,
      removeTodo,
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      // 第二个参数为bindings绑定的元素值，直接使用value解构
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
</style>