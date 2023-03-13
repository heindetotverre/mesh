import { computed, ref, Ref, onMounted } from "vue"
import { ValidationConfig } from "@/main"

export const useValidation = (
  config: {
    currentValue : Ref,
    fieldValidators : Function[],
    fieldName: string,
    isRequired: boolean,
    optionalSecondValidation : any
  },
  emit : Function
) => {
  const { currentValue, fieldValidators, fieldName, isRequired, optionalSecondValidation } = config

  onMounted(() => {
    validate({ validateLoose: true })
  })
  
  const getValidationResults = ({ validateStrict, validateLoose } : ValidationConfig) : { key : string }[] => {
    return fieldValidators.reduce((acc : { key : string }[], curr) => {
      const meta = {
        key: fieldName
      }
      if (validateStrict && !curr(currentValue.value, optionalSecondValidation)) {
        return [...acc, meta]
      }
      if (validateLoose && !!(currentValue.value && !curr(currentValue.value, optionalSecondValidation))) {
        return [...acc, meta]
      }
      return acc
    }, [])
  }

  const isValid = () => {
    if (isRequired) {
      return currentValue.value && !getValidationResults({ validateStrict: true }).length
    }
    return (!getValidationResults({ validateStrict: true }).length)
  }

  const validate = ({ clearLooseValidation, clearStrictValidation, validateLoose, validateStrict } : ValidationConfig) => {
    if (clearStrictValidation) {
        validationResult.value.messages = []
        validationResult.value.canSubmit = false;
        return
    }
    if (clearLooseValidation) {
      validationResult.value.messages = []
    }
    if (validateStrict) {
      validationResult.value.messages = getValidationResults({ validateStrict })
    }
    if (validateLoose) {
      validationResult.value.messages = getValidationResults({ validateLoose })
    }
    validationResult.value.canSubmit = isValid()
    emit('validate', validationResult.value)
  }

  const validationResult = ref<{messages: { key : string }[], canSubmit: boolean}>({messages: [], canSubmit: false})

  return {
    validate,
    validationResult
  }
}