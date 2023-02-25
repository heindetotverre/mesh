<template>
  <form
    @submit.stop.prevent="onSubmit()"
  >
    <div
      v-if="$slots.fields"
      ref="fieldElements"
    >
      <slot
        name="fields"
        :forceValidation="forceValidation"
        :formValues="formValues"
        :onValidate="onValidate"
        :validationMessages="validationMessagesPerField"
      />
    </div>
    <div
      v-if="$slots.error && validationLoose.length"
      class="m-t-1 error"
    >
      <slot name="error" /> {{ validationLoose.map(result => result.field).join(' ') }}
    </div>
    <slot 
      :canSubmit="canSubmit"
      name="buttons"
      :updateFormState="updateFormState"
    />
  </form>
</template>
<script setup lang="ts">
import { computed, ref, watch, PropType } from 'vue'
import { Content, ValidationConfig, ValidationResult } from '../../types/forms'
  
  const props = defineProps({
    content: {
      type: Function as PropType<Content>,
      default: () => ''
    },
    forceValidation: {
      type: Object as PropType<ValidationConfig>,
      default: () => ({})
    },
    formValues: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    name: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits([
    'submit',
    'update:formValues',
    'update:forceValidation'
  ])

  const fieldElements = ref()
  const forceValidation = ref<ValidationConfig>({})
  const validationStrict = ref<{field : string, canSubmit : boolean}[]>([])
  const validationLoose = ref<ValidationResult[]>([])

  const formValues = computed({ 
    get: () => props.formValues, 
    set: (value) => emit('update:formValues', value)
  })
  const canSubmit = computed(() => validationStrict.value.length === fieldElements.value?.children.length)

  watch(() => props.name, () => updateFormState({ clearForm : true, clearStrictValidation : true }))
  watch(() => props.forceValidation, (newValue) => updateFormState(newValue))

  const onSubmit = () => {
    if (canSubmit.value) {
      emit('submit', { formName: props.name, formValues } )
      validationStrict.value = []
    }
  }

  const onValidate = (field : string, { messages, canSubmit } : ValidationResult) => {
    if (canSubmit) {
      if (!validationStrict.value.find(validationResult => validationResult.field === field)) {
        validationStrict.value.push({ field, canSubmit })
      }
    } else {
      validationStrict.value = validationStrict.value.filter(validationResult => validationResult.field !== field)
    }
    if (messages?.length) {
      if (!validationLoose.value.find(validationResult => validationResult.field === field)) {
        validationLoose.value.push({ field, showMessage: true, messages })
      }
    } else {
      validationLoose.value = validationLoose.value.filter(validationResult => validationResult.field !== field)
    }
  }

  const updateFormState = ({ clearForm, clearStrictValidation, validateStrict } : ValidationConfig) => {
    if (clearForm) {
      for (var value in formValues.value){
        if (formValues.value.hasOwnProperty(value)) {
            delete formValues.value[value];
        }
      }
    }
    if (clearStrictValidation) {
      validationLoose.value = []
      validationStrict.value = []
    }
    forceValidation.value = { clearStrictValidation, validateStrict }
    emit('update:forceValidation', {})
  }

  const validationMessagesPerField = (fieldKey : string) => {
    return validationLoose.value.find((message) => message.field === fieldKey)?.messages || []
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