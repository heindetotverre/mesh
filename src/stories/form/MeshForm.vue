<template>
  <form
    class="form"
  >
    <component
      v-for="field of formFields"
      :id="`${field.key}_${field.id}`"
      :is="field.component"
      class="m-t-1"
      :label="getLabel('labels', field.key)"
      :name="field.key"
      :required="field.required"
      :type="field.type"
      :validation="field.validation"
      v-model="formValues[field.key]"
      @validate="onValidate(field.key, $event)"
    >
      <template #label>{{ getLabel('labels', field.key) }}</template>
      <template #error-message>{{ getLabel('validators', field.key) }}</template>
    </component>
    <div
      v-if="$slots.error && validationShowMessage.length"
      class="m-t-1 error"
    >
      <slot name="error" /> {{ validationShowMessage.map(result => result.field).join(' ') }}
    </div>
    <component
      v-for="button of formButtons"
      :id="`${button.key}_${button.id}`"
      :is="button.component"
      class="m-t-1"
      :disabled="validationCanSubmit.length !== formFields.length"
      :label="getLabel('labels', button.key)"
      :name="button.key"
      :type="button.type"
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
import { PropType, computed, ref } from 'vue'
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
      default: () => {}
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'validate'
  ])

  const validationCanSubmit = ref<{field : string, canSubmit : boolean}[]>([])
  const validationShowMessage = ref<{field: string, showMessage : boolean}[]>([])

  const formValues = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  })

  const formButtons = props.form.fields.filter(field => field.type === 'button')
  const formFields = props.form.fields.filter(field => field.type !== 'button')

  const getLabel = (type : string, key : string) => {
    return props.content(type, key) || props.content(type, 'default')
  }

  const onValidate = (field : string, { showMessage, canSubmit } : { showMessage : boolean, canSubmit : boolean }) => {
    if (canSubmit) {
      validationCanSubmit.value.push({ field, canSubmit })
    } else {
      validationCanSubmit.value = validationCanSubmit.value.filter(validateionResult => validateionResult.field !== field)
    }
    if (showMessage) {
      validationShowMessage.value.push({ field, showMessage })
    } else {
      validationShowMessage.value = validationShowMessage.value.filter(validateionResult => validateionResult.field !== field)
    }
  }

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