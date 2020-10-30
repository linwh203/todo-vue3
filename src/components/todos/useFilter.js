import { reactive, computed } from "vue"

const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed)
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed)
  },
}

export function useFilter(todos) {
  const filterState = reactive({
    visibility: "all",
    filteredTodos: computed(() => filters[filterState.visibility](todos.value)),
    filterItems: [
      {
        label: "ALL",
        value: "all",
      },
      {
        label: "ACTIVE",
        value: "active",
      },
      {
        label: "COMPLETED",
        value: "completed",
      },
    ],
  })

  return filterState
}
