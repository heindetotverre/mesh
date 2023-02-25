interface Form {
  meta: {
    name: string,
    multipart: boolean,
    parts?: string[]
  },
  fields: FormField[]
}

interface FormField {
  autocomplete?: string,
  component: string,
  disabled?: boolean,
  domclass?: string[],
  highlightValidation?: boolean,
  id: string,
  key: string,
  label?: string,
  name: string,
  options?: string[],
  type: string,
  required?: boolean,
  validation: Validator,
  variant?: string,
  visible?: boolean
}

interface ValidationConfig {
  clearForm?: boolean,
  clearLooseValidation?: boolean,
  clearStrictValidation?: boolean,
  looseValidate?: boolean,
  strictValidate?: boolean
}

interface ValidationResult {
  showMessage: boolean,
  canSubmit: boolean
}

interface Validator {
  (input: string): boolean
}

export type {
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
}