import { MeshForm, MeshInput, MeshButton } from '../index';
import { reactive } from 'vue'
import { email } from '../mocks/email'
import { nonumber } from '../mocks/nonumbers'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'

const content = (type, key) => contentMock[type]?.[key]

const getForm = (formKey, errorState) => {
  // set validators on form for Error Template
  const form = formMock.forms[formKey]
  form.fields.forEach(field => {
    if (errorState && field.key === 'email') {
      field.validation = email
    }
    if (errorState && (field.key === 'firstName' || field.key === 'lastName')) {
      field.validation = nonumber
    }
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
  form: getForm('initial', false),
}

export const Prefilled = Template.bind({})
Prefilled.args = {
  content: content,
  form: getForm('prefilled', false),
  formValues: {
    firstName: 'Testie',
    lastName: 'McTestface',
    email: 'test@test.test'
  }
}

export const Error = Template.bind({})
Error.args = {
  content: content,
  form: getForm('error', true),
  formValues: {
    email: '1234565'
  }
}