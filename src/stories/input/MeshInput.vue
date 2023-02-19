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
      @blur="onBlur()"
      @focus="onFocus()"
      v-model="currentValue"
    />
    <p v-if="validationResult.showMessage" class="input__error">
      <slot name="error-message" />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"

  const props = defineProps(shareableProps)
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)
  const validationResult = ref<{showMessage: boolean, canSubmit: boolean}>({showMessage: false, canSubmit: false})

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
    validationResult.value.showMessage ? 'input--error' : ''
  ])

  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  })

  onMounted(() => {
    validate()
  })

  const onBlur = () => {
    focus.value = false
    validate()
  }

  const onFocus = () => {
    focus.value = true
    validationResult.value = {
      showMessage: false,
      canSubmit: props.validation(currentValue.value)
    }
    emit('validate', validationResult.value)
  }

  const validate = () => {
    validationResult.value = {
      showMessage: !currentValue.value ? false : !props.validation(currentValue.value),
      canSubmit: !!(props.required && currentValue.value && props.validation(currentValue.value))
    }
    emit('validate', validationResult.value)
  }
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