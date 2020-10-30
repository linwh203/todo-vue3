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
    <!-- 回到首页 -->
    <button @click="backToDash">BACK TO DASH</button>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import EditTodoInput from "./EditTodoInput.vue";
import TodoItem from "./TodoItem.vue";
import Filters from "./Filters.vue";
import { useTodos } from "./useTodos.js";
import { useFilter } from "./useFilter.js";
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";

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

    // 获取路由实例
    const router = useRouter();

    // route为响应式对象，可以监听变化
    const route = useRoute();
    watch(
      () => route.query,
      (query) => console.log(query)
    );

    // 守卫
    // onBeforeRouteUpdate((to, from) => {})
    onBeforeRouteLeave((to, from) => {
      const confirm = window.confirm("Are you sure to leave this page ?");
      if (!confirm) return false;
    });

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      removeTodo,
      backToDash() {
        router.push("/");
      },
    };
  },
};
</script>

<style scoped>
</style>
