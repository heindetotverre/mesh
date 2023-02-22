import { MeshForm, MeshInput, MeshButton } from '../index';
import { reactive, ref } from 'vue'
import { email } from '../mocks/email'
import { nonumber } from '../mocks/nonumbers'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'

const content = (type, key) => contentMock[type]?.[key]

const getForm = (formKey, errorState) => {
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
    const forceValidation = ref(false)
    const formValues = ref(args.formValues)

    const updateforceValidation = (value) => {
      forceValidation.value = value
    }

    const updateValues = () => {
      formValues.value = {}
    }

    const error = 'This is an error message for the total form validation for fields:'

    return { args, formValues, error, forceValidation, updateforceValidation, updateValues }
  },
  template: `<MeshForm
    v-bind="args"
    :modelValue="formValues"
    :forceValidation="forceValidation"
    @update:formValues="formValues = event"
    @update:forceValidation="updateforceValidation">
      <template #error>{{ error }}</template>
    </MeshForm>
    <p>form: {{ formValues }}</p>
    <button @click="updateforceValidation(\'clear\')">force validation clear</button>
    <button @click="updateValues()">update values clear</button>`
})

export const Initial = Template.bind({})
Initial.args = {
  content: content,
  form: getForm('initial', false),
  formValues: {}
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
    email: '12345'
  }
}