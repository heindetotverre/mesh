<template>
  <form
    class="form"
    @submit.stop.prevent="onSubmit()"
  >
    <component
      v-for="field of formFields"
      :id="`${field.key}_${field.id}`"
      :is="field.component"
      class="m-t-1"
      :force-validation="forceValidation"
      :highlight-validation="field.highlightValidation"
      :label="getLabel('labels', field.key)"
      :name="field.key"
      :required="field.required"
      :type="field.type"
      :validation="field.validation"
      :variant="field.variant"
      v-model="formValues[field.key]"
      @validate="onValidate(field.key, $event)"
    >
      <template #label>{{ getLabel('labels', field.key) }}</template>
      <template #error-message>{{ getLabel('validators', field.key) }}</template>
    </component>
    <div
      v-if="$slots.error && validationLoose.length"
      class="m-t-1 error"
    >
      <slot name="error" /> {{ validationLoose.map(result => result.field).join(' ') }}
    </div>
    <div
      :class="[
        'm-t-1',
        'button-wrapper',
        {['click-block']: !canSubmit}
      ]"
      @click="forceValidation = true"
    >
      <component
        v-for="button of formButtons"
        :id="`${button.key}_${button.id}`"
        :is="button.component"
        :disabled="!canSubmit"
        :label="getLabel('labels', button.key)"
        :name="button.key"
        :type="button.type"
      />
  </div>
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
import { PropType, computed, ref, watch } from 'vue'
import { Form } from '../../../types/forms'

  const props = defineProps({
    content: {
      type: Function,
      default: () => {}
    },
    forceValidation: {
      type: [Boolean, String],
      default: false
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
    'submit',
    'update:modelValue',
    'update:forceValidation'
  ])

  const forceValidation = ref()
  const validationStrict = ref<{field : string, canSubmit : boolean}[]>([])
  const validationLoose = ref<{field: string, showMessage : boolean}[]>([])

  const canSubmit = computed(() => validationStrict.value.length === formFields.value.length)
  const formValues = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
  })
  const formButtons = computed(() => props.form.fields.filter(field => field.type === 'button' || field.type === 'submit'))
  const formFields = computed(() => props.form.fields.filter(field => field.type !== 'button' && field.type !== 'submit'))

  watch(() => props.form.meta.name, () => forceValidate('clear'))
  watch(() => props.forceValidation, (newVal) => forceValidate(newVal))

  const forceValidate = (instruction : string | boolean) => {
    forceValidation.value = instruction
    if (instruction === 'clear') {
      validationLoose.value = []
    }
    emit('update:forceValidation', false)
  }

  const getLabel = (type : string, key : string) => {
    return props.content(type, key) || props.content(type, 'default')
  }

  const onSubmit = () => {
    if (canSubmit.value) {
      emit('submit', props.form.meta.name, formValues.value)
    }
  }

  const onValidate = (field : string, { showMessage, canSubmit } : { showMessage : boolean, canSubmit : boolean }) => {
    if (forceValidation.value) forceValidation.value = false
    if (canSubmit) {
      if (!validationStrict.value.find(validationResult => validationResult.field === field)) {
        validationStrict.value.push({ field, canSubmit })
      }
    } else {
      validationStrict.value = validationStrict.value.filter(validationResult => validationResult.field !== field)
    }
    if (showMessage) {
      if (!validationLoose.value.find(validationResult => validationResult.field === field)) {
        validationLoose.value.push({ field, showMessage })
      }
    } else {
      validationLoose.value = validationLoose.value.filter(validationResult => validationResult.field !== field)
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

.button-wrapper {
  display: inline-block;
}

.click-block {
  cursor: not-allowed;

  button {
    pointer-events: none;
  }
}
</style>