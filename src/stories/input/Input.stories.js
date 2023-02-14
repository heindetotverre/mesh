import UiInput from './Input.vue'

export default {
  title: 'Components/Input',
  component: UiInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text','checkbox']
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
}

const Template = (args) => ({
  components: { UiInput },
  setup() {
    return { args }
  },
  template: '<UiInput v-bind="args"><template #label>{{ args.label }}</template></UiInput>'
})

export const Text = Template.bind({})
Text.args = {
  id: 'id',
  type: 'text',
  label: 'This is a text input',
  name: 'text',
  validation: {}
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  id: 'id',
  type: 'checkbox',
  label: 'This is a checkbox input',
  name: 'check',
  validation: {}
}