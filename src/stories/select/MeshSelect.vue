<template>
  <div :class="`select ${classes.join(' ')}`">
    <label
      v-if="$slots.label"
      :for="id"
      class="select__label"
    >
      <slot name="label" />
    </label>
    <select
      v-if="native"
      :name="props.name"
      :id="props.id"
      v-model="currentValue"
    >
      <option
        value=""
      >
        {{ props.label }}
      </option>
      <option
        v-for="option, index of options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <div v-else>
      non native select
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import shareableProps from "../shareableProps"
import shareableEmits from "../shareableEmits"
import { useValidation } from '../../composables/useValidation'

  const props = defineProps({
    ...shareableProps,
    native: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
  ])
  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => [emit('update:modelValue', value), validate({})]
  })

  const { validate } = useValidation(
    {
      currentValue: currentValue,
      fieldValidators: props.validators,
      isRequired: props.required
    },
    emit
  )


</script>
<style scoped lang="scss">
@import "../../assets/variables.scss";
.select {
  &__label {
    display: block;
    margin-bottom: calc(.5 * $margin);
  }
}

select {
  border-color: $color-grey-normal;
  border-style: solid;
  display: block;
  outline: none;
  padding: calc(.5 * $margin) $margin;
}
</style>