<template>
  <div :class="`input input__${type} ${classes.join(' ')}`">
    <label
      v-if="$slots.label"
      :for="id"
      class="input__label"
    >
      <slot name="label" />
    </label>
    <input
      :autocomplete="autocomplete"
      :disabled="disabled"
      :id="id"
      :name="name"
      :type="type"
      @blur="focus = false"
      @focus="focus = true"
      v-model="currentValue"
    />
    <p v-if="!validationResult" class="input__error">
      <slot name="error-message" />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"

  const props = defineProps(shareableProps)
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
    !props.validationResult ? 'input--error' : ''
  ])

  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  }) 
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.input {
  &__label,
  input {
    display: block;
  }

  &__label {
    margin-bottom: calc(.5 * $margin);
  }

  &--error input,
  &--error &__error {
    border-color: red;
    color: red;
  }

  input {
    padding: calc(.5 * $margin) $margin;
  }
}
</style>