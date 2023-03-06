<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

const { fetchTodos, createTodo, todoList: todos, completed } = useTodosStore()
await fetchTodos()

const newTask = reactive<TaskFields>({
  header: '',
  description: '',
  endedAt: new Date(Date.now()),
  startedAt: new Date(Date.now()),
  isComplete: false,
})
const isFilled = computed(() => {
  return !!newTask.header && !!newTask.description && !!newTask.endedAt
})
const errors = reactive({ description: '' })

const clearForm = () => {
  newTask.header = ''
  newTask.description = ''
  newTask.isComplete = false
}

const createTask = () => {
  if (newTask.description && newTask.description.length <= 3) {
    errors.description = 'Описание должно быть больше 3 симоволов'
    return false
  }
  return createTodo(newTask).then(() => {
    clearForm()
    return true
  }).catch(() => false)
}
</script>

<template>
  <modal>
    <template #trigger="{ data: { setIsOpen } }">
      <ui-button class="centered relative bottom-7" @click="setIsOpen()">
        <span>Создать</span>
        <i class="i-carbon-add-alt p-2" />
      </ui-button>
    </template>
    <template #default="{ data: { setIsOpen } }">
      <div class="column gap-3">
        <h3 class="text-5 fw-700">
          Создать задачу
        </h3>

        <form
          action="#"
          class="column gap-3"
          @submit.prevent="async() => {
            if (await createTask()) setIsOpen()
          }"
        >
          <ui-input v-model="newTask.header" placeholder="Заголовок" />
          <ui-input v-model="newTask.description" placeholder="Текст" />
          <span v-if="errors?.description" class="c-danger text-3">
            {{ errors?.description }}
          </span>
          <VueDatePicker
            v-model="newTask.endedAt"
            input-class-name="ui-input"
            dark :enable-time-picker="false"
            position="right"
          >
            <template #action-row="{ selectDate }">
              <span class="fs-14 c-purple" @click="selectDate">
                Выбрать
              </span>
            </template>
          </VueDatePicker>
          <ui-button
            type="submit"
            class="centered"
            :disabled="!isFilled"
          >
            <span>Создать</span>
            <i class="i-carbon-add-alt p-2" />
          </ui-button>
        </form>
      </div>
    </template>
  </modal>

  <div class="flex justify-between mt-16">
    <span>
      <span class="fs-14 c-blue">
        Всего задач
      </span>
      <span class="ui-label ml-2">
        {{ todos?.length }}
      </span>
    </span>
    <span>
      <span class="fs-14 c-purple">
        Выполнено
      </span>
      <span class="ui-label ml-2">
        {{ completed }}
      </span>
    </span>
  </div>

  <div v-if="!todos?.length" class="rounded-2 h-200px b-t border-gray-400 mt-8">
    <section class="text-center mt-16 column items-center">
      <i class="i-carbon-align-box-top-center p-2 text-14 c-gray-400" />
      <span class="c-gray-300 column mt-2">
        <span class="fw-700">
          У Вас еще нет созданных задач
        </span>
        <span class="fw-300">
          Создавайте задачи и организуйте свои дела
        </span>
      </span>
    </section>
  </div>

  <div v-else class="column gap-2 mt-4">
    <nuxt-link v-for="todo in todos" :key="todo.id" :to="`/${todo.id}`">
      <todo :todo="todo" />
    </nuxt-link>
  </div>
</template>
