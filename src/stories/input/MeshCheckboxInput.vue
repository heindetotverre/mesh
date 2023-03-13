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
      type="checkbox"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput()"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"
  import { useValidation } from '../../composables/useValidation'

  const props = defineProps({
    ...shareableProps,
    secondValidationValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : ''
  ])
  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value)
  })

  const { validate } = useValidation(
    {
      currentValue: currentValue,
      fieldValidators: props.validators,
      fieldName: props.name || 'default',
      isRequired: props.required,
      optionalSecondValidation: props.secondValidationValue
    },
    emit
  )

  const onBlur = () => {
    focus.value = false
  }

  const onFocus = () => {
    focus.value = true
  }

  const onInput = () => {
    currentValue.value = !currentValue.value
    validate({})
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

  input {
    padding: calc(.5 * $margin) $margin;
  }
}
</style>