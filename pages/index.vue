<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { apiUrl } from '../constants/index'

const { data: todos } = await useFetch(`${apiUrl}/todos`)

interface TaskFields {
  header: string
  description: string
  endedAt: Date
}
const newTask = reactive<TaskFields>({
  header: '',
  description: '',
  endedAt: new Date(Date.now()),
})
const isFilled = computed(() => {
  return Object.values(newTask).filter(Boolean).length === Object.values(newTask).length
})

const errors = reactive({ description: '' })

const createTask = async () => {
  if (newTask.description.length <= 3) {
    errors.description = 'Описание должно быть больше 3 симоволов'
    return false
  }
  const r = await $fetch(`${apiUrl}/todos`, {
    method: 'POST',
    body: { ...newTask, createdAt: new Date(Date.now()) },
  })
  return true
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
          @submit.prevent="() => {
            if (createTask()) setIsOpen()
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

  <pre>{{ todos }}</pre>
</template>
