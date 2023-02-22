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
    type: [Boolean, String],
    default: false
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
  validation: {
    type: Function,
    default: () => true
  },
  visible: {
    type: Boolean,
    default: true
  }
}