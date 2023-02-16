export default {
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  autocomplete: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'test'
  },
  type: {
    type: String,
    default: 'text',
    validator: (value : string) => ['text', 'checkbox'].includes(value)
  },
  options: {
    type: Array,
    default: []
  },
  modelValue: {
    type: [String,Number,Boolean,Array,Object],
    default: ''
  },
  domclass: {
    type: Array,
    default: () => ['']
  },
  validationResult: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  elementName: {
    type: String,
    default: ''
  }
}