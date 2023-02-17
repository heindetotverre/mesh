<template>
  <form
    class="form"
  >
    <component
      v-for="field of form.fields.filter(field => field.type !== 'button')"
      :id="`${field.key}_${field.id}`"
      :is="field.component"
      class="m-t-1"
      :label="content(field.key)"
      :name="field.key"
      :required="field.required"
      :type="field.type"
      :validationResult="field.validation(formValues[field.key])"
      v-model="formValues[field.key]"
    >
      <template #label>{{ props.content(field.key) }}</template>
      <template #error-message>this is an error message</template>
    </component>
    <div
      v-if="$slots.error && validationTotale.length"
      class="m-t-1 error"
    >
      <slot name="error" />{{ validationTotale.map(result => result.field) }}
    </div>
    <component
      v-for="field of form.fields.filter(field => field.type === 'button')"
      :id="`${field.key}_${field.id}`"
      :is="field.component"
      class="m-t-1"
      :disabled="!!validationTotale.length"
      :label="content(field.key)"
      :name="field.key"
      :type="field.type"
    />
  </form>
</template>

<script lang="ts">
import { MeshButton, MeshInput } from "../index";
export default {
  components: {
    MeshButton, MeshInput
  }
}
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Form } from '../../../types/forms'

  const props = defineProps({
    content: {
      type: Function,
      default: () => {}
    },
    form: {
      type: Object as PropType<Form>,
      required: true
    },
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      default: {}
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'onValidate'
  ])

  const formValues = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  })

  const validationTotale = computed(() => {
    let validationResultArray : {positiveValidationResult:boolean, field:string}[] = []
    props.form.fields.forEach(field => {
      if (formValues.value[field.key] && field.validation) {
        const positiveValidationResult = field.validation(formValues.value[field.key])
        if (!positiveValidationResult) {
          validationResultArray.push({ positiveValidationResult, field: field.key})
        }
      }
    })
    emit('onValidate', validationResultArray)
    return validationResultArray
  });
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.m-t-1 {
  margin-top: $margin;
}

.error {
  color: red;
}
</style>