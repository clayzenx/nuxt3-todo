<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})
</script>

<template>
  <input
    v-model="value"
    class="ui-input"
    placeholder="Введите текст"
  >
</template>
