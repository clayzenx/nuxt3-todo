<script setup lang="ts">
const props = defineProps<{
  todo: Task
}>()

const { updateTodo, deleteTodo } = useTodosStore()

const checked = ref(props.todo.isComplete)

watch(checked, (v: boolean) => {
  console.log('update', v)
  if (props.todo.id)
    updateTodo(props.todo.id, { isComplete: v })
})

const deleteTask = async () => {
  if (props.todo.id)
    deleteTodo(props.todo.id)
}
</script>

<template>
  <ui-container class="flex items-start justify-between gap-4 w-100%">
    <ui-checkbox v-model="checked" />
    <section class="column gap-2 flex-auto">
      <div class="flex flex-col sm-flex-row justify-between items-center">
        <h3
          class="text-5.fw-700"
          :class="checked ? 'line-through c-gray-300' : ''"
        >
          {{ todo.header }}
        </h3>
        <div class="column">
          <span class="flex justify-end items-center text-3">
            <span class="c-gray-300">
              Дата создания:
            </span>
            <span v-if="todo.startedAt" class="ml-1 c-blue">
              {{ new Date(todo.startedAt).toLocaleString() }}
            </span>
          </span>
          <span class="flex justify-end items-center text-3">
            <span class="c-gray-300">
              Дата окончания:
            </span>
            <span class="ml-1 c-blue">
              {{ new Date(todo.endedAt).toLocaleString() }}
            </span>
          </span>
        </div>
      </div>
      <span
        class="text-3 c-gray-100 fw-300"
        :class="checked ? 'line-through c-gray-300' : ''"
      >
        {{ todo.description }}
      </span>
    </section>
    <ui-delete-icon @click="deleteTask" />
  </ui-container>
</template>
