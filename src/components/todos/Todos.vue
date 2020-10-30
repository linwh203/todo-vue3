<template>
  <div>
    <!-- 新增todo, 多处复用，使用全局注册方法，挂载到APP上 -->
    <EditTodoInput v-model:todo-title="newTodo" @keyup.enter="addTodo" autofocus placeholder="新增今日待办"
      autocomplete="off">
    </EditTodoInput>
    <!-- todo list -->
    <ul>
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" v-model:editing-todo="editingTodo"
        @remove-todo="removeTodo">
      </TodoItem>
    </ul>
    <!-- 过滤 -->
    <Filters :items="filterItems" v-model="visibility"></Filters>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import EditTodoInput from "./EditTodoInput.vue";
import TodoItem from "./TodoItem.vue";
import Filters from "./Filters.vue";
import { useTodos } from "./useTodos.js";
import { useFilter } from "./useFilter.js";

export default {
  components: {
    EditTodoInput,
    TodoItem,
    Filters,
  },
  setup() {
    const todoState = reactive({
      newTodo: "",
      editingTodo: null,
    });
    const { todos, addTodo, removeTodo } = useTodos(todoState);
    const filterState = useFilter(todos);

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      removeTodo,
    };
  },
};
</script>

<style scoped>
</style>
