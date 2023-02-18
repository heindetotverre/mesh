<template>
  <form
    class="form"
  >
    <component
      v-for="field of form.fields.filter(field => field.type !== 'button')"
      :id="`${field.key}_${field.id}`"
      :is="field.component"
      class="m-t-1"
      :label="getLabel('labels', field.key)"
      :name="field.key"
      :required="field.required"
      :type="field.type"
      :validation="field.validation"
      v-model="formValues[field.key]"
      @blur="touched[field.key] = true"
    >
      <template #label>{{ getLabel('labels', field.key) }}</template>
      <template #error-message>{{ getLabel('validators', field.key) }}</template>
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
      :label="getLabel('labels', field.key)"
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
import { PropType, computed, reactive } from 'vue'
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

  const touched = reactive({}) as Record<string, unknown>

  const formValues = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  })

  const getLabel = (type : string, key : string) => {
    return props.content(type, key) || props.content(type, 'default')
  }

  const validationTotale = computed(() => {
    let validationResultArray : {positiveValidationResult:boolean, field:string}[] = []
    props.form.fields.forEach(field => {
      if (touched[field.key] && field.validation) {
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