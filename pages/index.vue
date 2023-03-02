<script setup lang="ts">
import { apiUrl } from '../constants/index'

const { data: todos } = await useFetch(`${apiUrl}/todos`)
const isOpen = ref(true)

const setIsOpen = (v: boolean) => {
  isOpen.value = v
}
</script>

<template>
  <div>hello</div>
</template>
