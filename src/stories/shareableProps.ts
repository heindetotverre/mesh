import { PropType } from "vue"
import { ValidationConfig, Validator } from '../types/forms'

export default {
  autocomplete: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  domclass: {
    type: Array,
    default: ['']
  },
  elementName: {
    type: String,
    default: ''
  },
  forceValidation: {
    type: Object as PropType<ValidationConfig>,
    default: () => ({})
  },
  highlightValidation: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String,Number,Boolean,Array,Object],
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: []
  },
  required: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (value : string) => ['text', 'checkbox', 'password', 'email', 'button', 'submit'].includes(value)
  },
  validators: {
    type: Array as PropType<Validator[]>,
    default: []
  },
  visible: {
    type: Boolean,
    default: true
  }
}