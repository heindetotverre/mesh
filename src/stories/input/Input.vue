<template>
  <div :class="[domclass, 'input__wrapper']" v-if="visible">
    <slot name="label" />
    <input
      :id="id"
      :autocomplete="autocomplete"
      :class="`input__el input__el--${type} ${domclass}`"
      v-model="currentValue"
      :type="type"
      :disabled="disabled"
      @blur="emits('blur')"
      @focus="emits('focus')"
    />
    <slot name="error-message" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"

  const props = defineProps(shareableProps)
  const emits = defineEmits(shareableEmits)
  const currentValue = ref('')
</script>