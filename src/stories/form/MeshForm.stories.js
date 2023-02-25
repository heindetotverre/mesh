import { ref } from 'vue'
import FormWrapper from './MeshFormWrapper.vue'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'
import { email } from '../mocks/email'
import { nonumber } from '../mocks/nonumbers'

const content = (type, key) => contentMock[type]?.[key]
const form = formMock.forms.prefilled

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
  component: FormWrapper,
  argTypes: {},
};

const Template = (args) => ({
  components: { FormWrapper },
  setup () {
    const formValues = ref(args.formValues)
    const forceValidation = ref({})

    const onSubmit = (payload) => {
      formValues.value = {}
    }

    const clearForm = () => {
      formValues.value = {}
    }

    const clearValidation = () => {
      forceValidation.value = { clearStrictValidation: true }
    }

    return { args, onSubmit, formValues, clearForm, clearValidation, forceValidation }
  },
  template:`
    <FormWrapper
      :content="args.content"
      :force-validation="forceValidation"
      :form="args.form"
      :formValues="formValues"
      @submit="onSubmit"
    />
    <button @click="clearForm">clear form</button>
    <button @click="clearValidation">clear validation</button>`
});

export const Initial = Template.bind({});
Initial.args = {
  form: getForm('initial', true),
  content: content
};

export const Error = Template.bind({});
Error.args = {
  form: getForm('error', true),
  content: content,
  formValues: {
    email: '12345'
  }
};