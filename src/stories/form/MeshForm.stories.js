import { MeshForm, MeshInput, MeshButton } from '../index';
import { reactive } from 'vue'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'

const content = key => contentMock.labels[key]

const getForm = (formKey, errorState) => {
  const form = formMock.forms[formKey]
  form.fields.forEach(field => {
    field.validation = () => errorState
  })
  return form
}

export default {
  title: 'Components/Form',
  component: MeshForm
}

const Template = (args) => ({
  components: { MeshForm, MeshInput, MeshButton },
  setup() {
    const formValues = args.formValues
      ? reactive(args.formValues)
      : reactive({})

    const updateModel = (event) => {
      formValues = event
    }

    const error = 'This is an error message for the total form validation for fields:'

    return { args, formValues, updateModel, error }
  },
  template: '<MeshForm v-bind="args" :modelValue="formValues" @update:formValues="updateModel"><template #error>{{ error }}</template></MeshForm><p>form: {{ formValues }}</p>'
})

export const Initial = Template.bind({})
Initial.args = {
  content: content,
  form: getForm('initial', true),
}

export const Prefilled = Template.bind({})
Prefilled.args = {
  content: content,
  form: getForm('prefilled', true),
  formValues: {
    firstName: 'Testie',
    lastName: 'McTestface',
    email: 'test@test.test'
  }
}

export const Error = Template.bind({})
Error.args = {
  content: content,
  form: getForm('error', false),
  formValues: {
    firstName: 'Testie',
    lastName: 'McTestface',
    email: '1234565'
  }
}