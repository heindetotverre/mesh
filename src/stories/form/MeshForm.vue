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
        :getLabel="getLabel"
        :onValidate="onValidate"
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
      :getLabel="getLabel"
      :updateFormState="updateFormState"
    />
  </form>
</template>
<script setup lang="ts">
import { computed, ref, watch, PropType } from 'vue'
import { ValidationConfig, ValidationResult } from '../../types/forms'
  
  const props = defineProps({
    content: {
      type: Function,
      default: () => {}
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
  const forceValidation = ref<ValidationConfig>()
  const validationStrict = ref<{field : string, canSubmit : boolean}[]>([])
  const validationLoose = ref<{field: string, showMessage : boolean}[]>([])

  const formValues = computed({ 
    get: () => props.formValues, 
    set: (value) => emit('update:formValues', value)
  })
  const canSubmit = computed(() => validationStrict.value.length === fieldElements.value?.children.length)

  watch(() => props.name, () => updateFormState({ clearForm : true, clearStrictValidation : true }))
  watch(() => props.forceValidation, (newValue) => updateFormState(newValue))

  const getLabel = (type : string, key : string | undefined) => {
    return props.content(type, key) || props.content(type, 'default')
  }

  const onSubmit = () => {
    if (canSubmit.value) {
      emit('submit', { formName: props.name, formValues } )
      validationStrict.value = []
    }
  }

  const onValidate = (field : string, { showMessage, canSubmit } : ValidationResult) => {
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

  const updateFormState = ({ clearForm, clearStrictValidation, strictValidate } : ValidationConfig) => {
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
    forceValidation.value = { clearStrictValidation, strictValidate }
    emit('update:forceValidation', false)
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