<script setup lang="ts">
import { apiUrl } from '../constants/index'

const props = defineProps<{
  todo: Task
}>()
const emit = defineEmits(['delete', 'update'])

const checked = ref(props.todo.isComplete)

watch(checked, async () => {
  console.log('updated', checked.value)
  await $fetch(`${apiUrl}/todos/${props.todo.id}`, {
    method: 'PUT',
    body: { ...props.todo, isComplete: checked.value },
  })
  emit('update')
})

const deleteTask = async () => {
  await $fetch(`${apiUrl}/todos/${props.todo.id}`, {
    method: 'DELETE',
  })
  emit('delete')
}
</script>

<template>
  <ui-container class="flex items-start justify-between gap-4 w-100%">
    <ui-checkbox v-model="checked" />
    <section class="column gap-2 flex-auto">
      <div class="flex flex-col sm-flex-row justify-between items-center">
        <h3 class="text-5.fw-700">
          {{ todo.header }}
        </h3>
        <div class="column">
          <span class="flex justify-end items-center text-3">
            <span class="c-gray-300">
              Дата создания:
            </span>
            <span class="ml-1 c-blue" v-if="todo.startedAt">
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
      <span class="text-3 c-gray-100 fw-300">
        {{ todo.description }}
      </span>
    </section>
    <ui-delete-icon @click="deleteTask" />
  </ui-container>
</template>
