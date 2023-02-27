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
    <p v-if="validationResult.messages.length" class="input__error">
      <slot name="error-message" />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"
  import { ValidationConfig } from "@/types/forms";

  const props = defineProps({
    ...shareableProps,
    secondValidationValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)
  const validationResult = ref<{messages: { key : string }[], canSubmit: boolean}>({messages: [], canSubmit: false})

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
    validationResult.value.messages.length ? 'input--error' : '',
    validationResult.value.canSubmit && props.highlightValidation && currentValue.value ? 'input--validated' : ''
  ])
  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => [emit('update:modelValue', value), validate({})]
  })
  const isValid = computed(() => !!(props.required && currentValue.value && !getValidatedMeta({ validateStrict: true }).length))

  watch(() => props.forceValidation, (newVal) => {
    if (newVal) {
      validate(newVal)
    }
  })

  onMounted(() => {
    validate({ validateLoose: true })
  })

  const onBlur = () => {
    focus.value = false
    validate({ validateLoose: true })
  }

  const onFocus = () => {
    focus.value = true
    validate({ clearLooseValidation: true })
  }

  const getValidatedMeta = ({ validateStrict, validateLoose } : ValidationConfig) : { key : string }[] => {
    return props.validators.reduce((acc : { key : string }[], curr) => {
      const meta = {
        key: curr.name
      }
      if (validateStrict && !curr(currentValue.value, props.secondValidationValue)) {
        return [...acc, meta]
      }
      if (validateLoose && !!(currentValue.value && !curr(currentValue.value, props.secondValidationValue))) {
        return [...acc, meta]
      }
      return acc
    }, [])
  }

  const validate = ({ clearLooseValidation, clearStrictValidation, validateLoose, validateStrict } : ValidationConfig) => {
    console.log(currentValue.value)
    if (clearStrictValidation) {
        validationResult.value.messages = []
        validationResult.value.canSubmit = false;
        return
    }
    if (clearLooseValidation) {
      validationResult.value.messages = []
    }
    if (validateStrict) {
      validationResult.value.messages = getValidatedMeta({ validateStrict })
    }
    if (validateLoose) {
      validationResult.value.messages = getValidatedMeta({ validateLoose })
    }
    validationResult.value.canSubmit = isValid.value
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