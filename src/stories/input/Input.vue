<template>
  <div :class="[domclass, 'input__wrapper']" v-if="visible">
    <slot name="label" />
    <input
      :id="id"
      :autocomplete="autocomplete"
      :class="`input__el input__el--${type} ${domclass}`"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @blur="emits('blur')"
      @focus="emits('focus')"
      @input="input($event)"
    />
    <slot name="error-message" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits)

  const currentValue = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        currentValue.value = newValue
      }
  })

  const input = (event: Event) => {
    const inputEl = event.target as HTMLInputElement
    emits('update:modelValue', inputEl.value)
  }
</script>

