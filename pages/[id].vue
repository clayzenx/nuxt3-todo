<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()
const { fetchTodo } = useTodosStore()
const { todo } = storeToRefs(useTodosStore())

await fetchTodo(+route.params.id)

useHead({
  title: todo.value?.header,

  meta: [
    { name: 'description', content: todo.value?.description },
  ],
})
</script>

<template>
  <div class="flex gap-2 c-gray-300 text-4 mt-8">
    <nuxt-link to="/">
      Главная
    </nuxt-link>
    <span>/</span>
    <span>{{ todo?.header }}</span>
  </div>

  <ui-container class="column gap-2 mt-2">
    <h3 class="text-5.fw-700">
      {{ todo?.header }}
    </h3>
    <span class="text-3 c-gray-100 fw-300">
      {{ todo?.description }}
    </span>
  </ui-container>

  <div class="column mt-2">
    <span class="flex justify-start items-center text-3">
      <span class="c-gray-300">
        Дата создания:
      </span>
      <span v-if="todo?.startedAt" class="ml-1 c-blue">
        {{ new Date(todo?.startedAt).toLocaleString() }}
      </span>
    </span>
    <span class="flex justify-start items-center text-3">
      <span class="c-gray-300">
        Дата окончания:
      </span>
      <span v-if="todo?.endedAt" class="ml-1 c-blue">
        {{ new Date(todo?.endedAt).toLocaleString() }}
      </span>
    </span>
  </div>
</template>
