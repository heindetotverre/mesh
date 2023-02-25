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
      :required="required"
      @blur="onBlur"
      @focus="onFocus"
      @input="validate({})"
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
import { ValidationConfig } from "@/types/forms";

  const props = defineProps(shareableProps)
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)
  const validationResult = ref<{showMessage: boolean, canSubmit: boolean}>({showMessage: false, canSubmit: false})

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
    validationResult.value.showMessage ? 'input--error' : '',
    validationResult.value.canSubmit && props.highlightValidation && currentValue.value ? 'input--validated' : ''
  ])

  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value)
  })

  watch(() => props.forceValidation, (newVal) => {
    if (newVal) {
      validate(newVal)
    }
  })

  onMounted(() => {
    validate({ looseValidate: true })
  })

  const isValid = () => !!(props.required && currentValue.value && props.validation(currentValue.value))

  const onBlur = () => {
    focus.value = false
    validate({ looseValidate: true })
  }

  const onFocus = () => {
    focus.value = true
    validate({ clearLooseValidation: true })
  }

  const validate = ({ clearLooseValidation, clearStrictValidation, looseValidate, strictValidate } : ValidationConfig) => {
    if (clearStrictValidation) {
        validationResult.value.showMessage = false
        validationResult.value.canSubmit = false;
        return
    }
    if (clearLooseValidation) {
      validationResult.value.showMessage = false
    }
    if (strictValidate) {
      validationResult.value.showMessage = !props.validation(currentValue.value)
    }
    if (looseValidate) {
      validationResult.value.showMessage = !!(currentValue.value && !props.validation(currentValue.value))
    }
    validationResult.value.canSubmit = isValid() 
    emit('validate', validationResult.value)
  }
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.input {
  input {
    border-color: $color-grey-normal;
    border-style: solid;
    outline: none;
  }

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

  &--validated input {
    border-color: green;
  }

  input {
    padding: calc(.5 * $margin) $margin;
  }
}
</style>