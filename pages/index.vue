<script setup lang="ts">
import { apiUrl } from '../constants/index'

const { data: todos } = await useFetch(`${apiUrl}/todos`)
</script>

<template>
  <modal>
    <template #trigger="{ data: { setIsOpen } }">
      <button
        type="button"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="setIsOpen()"
      >
        Open dialog
      </button>
    </template>
    <template #default="{ data: { setIsOpen } }">
      <button
        type="button"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="setIsOpen()"
      >
        Close dialog
      </button>
    </template>
  </modal>
</template>
