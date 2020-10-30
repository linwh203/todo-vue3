import { ref, watchEffect } from "vue"

// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]")
    return todos
  },
  // 改变todos时候需要save，属于一个需要监听的副作用，配合watchEffect使用
  save(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
  },
}

export function useTodos(state) {
  const todos = ref(todoStorage.fetch())
  // todos使用ref形式，此处需要加value来访问值
  function addTodo() {
    if (state.newTodo === "") return
    todos.value.push({
      id: todos.value.length + 1,
      title: state.newTodo,
      completed: false,
    })
    state.newTodo = ""
  }

  function removeTodo(todo) {
    todos.value.splice(todos.value.indexOf(todo), 1)
  }

  watchEffect(() => {
    // 调用即建立watch依赖关系，不需要额外写依赖对象
    todoStorage.save(todos.value)
  })

  return { todos, addTodo, removeTodo }
}
