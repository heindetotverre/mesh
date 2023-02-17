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
  type: {
    type: String,
    default: 'text',
    validator: (value : string) => ['text', 'checkbox', 'password', 'email', 'button'].includes(value)
  },
  validationResult: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}