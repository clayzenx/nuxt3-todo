import { acceptHMRUpdate, defineStore } from 'pinia'
import { apiUrl } from '../constants/index'

export const useTodosStore = defineStore('todos', () => {
  const todoList = ref(new Array<Task>())
  const todo = ref<Task | null>(null)

  const fetchTodo = async (id: number) => {
    const { data, refresh } = await useAsyncData<Task | null>('todo', () => $fetch(`${apiUrl}/todos/${id}`))
    todo.value = data.value
    return refresh
  }

  const fetchTodos = async () => {
    todoList.value.length = 0
    const { data: todos, refresh } = await useAsyncData<Array<Task>>('todos', () => $fetch(`${apiUrl}/todos`))
    todoList.value.push(...todos.value as Array<Task>)
    return refresh
  }

  const createTodo = async (newTask: Task) => {
    try {
      const task: Task = await $fetch(`${apiUrl}/todos`, {
        method: 'POST',
        body: newTask,
      })
      todoList.value.push(task)
      return true
    }
    catch (e) {
      console.error(e)
      return false
    }
  }

  const updateTodo = (id: number, update: TaskFields) => {
    todoList.value.map(todo => todo.id === id ? ({ ...todo, ...update }) : todo)
    return $fetch(`${apiUrl}/todos/${id}`, {
      method: 'PUT',
      body: { ...update },
    })
  }

  const deleteTodo = (id: number) => {
    todoList.value.splice(todoList.value.findIndex(todo => todo.id === id), 1)
    return $fetch(`${apiUrl}/todos/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    fetchTodos,
    fetchTodo,
    createTodo,
    todo,
    todoList,
    updateTodo,
    deleteTodo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot))
