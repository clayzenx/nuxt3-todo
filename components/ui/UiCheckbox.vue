<script setup lang="ts">
import { Switch as UiSwitch } from '@headlessui/vue'

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <UiSwitch
    :value="modelValue"
    class="inline-flex h-6 w-6 rounded-full justify-center items-center"
    :class="modelValue ? 'bg-purple hover-bg-purple-dark' : 'border-3 border-blue hover-bg-blue hover-bg-op-20'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="i-carbon-checkmark h-4 w-4"
      :class="modelValue ? 'c-gray-100' : 'c-transparent'"
    />
  </UiSwitch>
</template>
