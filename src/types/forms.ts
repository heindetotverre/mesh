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

interface Validator {
  (input: string): boolean
}

export type {
  Form,
  FormField
}