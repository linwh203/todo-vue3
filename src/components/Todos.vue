<template>
  <div>
    <!-- 新增todo -->
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" autofocus placeholder="新增今日待办" autocomplete="off">
    <!-- todo list -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id"
        :class="{completed: todo.completed, editing: todo === editingTodo}">
        <!-- 编辑待办,利用自定义指令来autofocus -->
        <input type="text" class="edit" v-model="todo.title" v-if="todo === editingTodo"
          v-todo-focus="todo === editingTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
        <div class="view" v-else>
          <!-- 绑定完成状态 -->
          <input type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{todo.title}}:{{todo.completed}}</label>
          <button @click="removeTodo(todo)">x</button>
        </div>
      </li>
    </ul>
    <!-- 过滤 -->
    <p class="filters">
      <span @click="visibility='all'" :class="{selected: visibility === 'all'}">ALL</span>
      <span @click="visibility='active'" :class="{selected: visibility === 'active'}">ACTIVE</span>
      <span @click="visibility='completed'" :class="{selected: visibility === 'completed'}">COMPLETED</span>
    </p>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue";

const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};

// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    return todos;
  },
  // 改变todos时候需要save，属于一个需要监听的副作用，配合watchEffect使用
  save(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};

export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetch(),
      beforeEditCache: "", // 保存编辑前的title
      editingTodo: null,
      visibility: "all",
      filteredTodos: computed(() => filters[state.visibility](state.todos)),
    });

    function addTodo() {
      if (state.newTodo === "") return;
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false,
      });
      state.newTodo = "";
    }
    function removeTodo(todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    }
    function doneEdit(todo) {
      state.editingTodo = null;
    }
    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      state.editingTodo = todo;
    }
    function cancelEdit(todo) {
      todo.title = state.beforeEditCache;
      state.editingTodo = null;
    }

    watchEffect(() => {
      // 调用即建立watch依赖关系，不需要额外写依赖对象
      todoStorage.save(state.todos);
    });

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      doneEdit,
      cancelEdit,
      editTodo,
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
