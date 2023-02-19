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
      @blur="onBlur"
      @focus="onFocus"
      @input="validate"
      v-model="currentValue"
    />
    <p v-if="validationResult.showMessage" class="input__error">
      <slot name="error-message" />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
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

  watch(() => props.forceValidation, (newVal) => {
    if (newVal) {
      validate(null, true)
    }
  })

  onMounted(() => {
    validate(null)
  })

  const isValid = () => !!(props.required && currentValue.value && props.validation(currentValue.value))

  const onBlur = (event : Event) => {
    focus.value = false
    validate(event)
  }

  const onFocus = (event : Event) => {
    focus.value = true
    validate(event)
  }

  const validate = (event : Event | null, force : boolean | void) => {
    if (force) {
      validationResult.value.showMessage = !props.validation(currentValue.value)
    } else {
      validationResult.value.showMessage = !(event?.type === 'focus' || event?.type === 'input' || !currentValue.value)
        ? !props.validation(currentValue.value)
        : false
    }
    validationResult.value.canSubmit = isValid()
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