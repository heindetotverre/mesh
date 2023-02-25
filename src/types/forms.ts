interface Content {
  (type: string, key: string): string
}

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
  validators: Validator[],
  variant?: string,
  visible?: boolean
}

interface ValidationConfig {
  clearForm?: boolean,
  clearLooseValidation?: boolean,
  clearStrictValidation?: boolean,
  validateLoose?: boolean,
  validateStrict?: boolean
}

interface ValidationResult {
  field: string,
  messages?: { key: string }[],
  canSubmit?: boolean,
  showMessage?: boolean
}

interface Validator {
  (input: string | number | boolean | unknown | Record<string, any>): boolean
}

export type {
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
}