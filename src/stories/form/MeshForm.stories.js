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
  title: 'Components/Form Slots',
  component: FormWrapper,
  argTypes: {},
};

const Template = (args) => ({
  components: { FormWrapper },
  setup () {
    const formValues = ref(args.formValues)

    const onSubmit = (payload) => {
      console.log('submit payload: ', payload)
    }

    return { args, onSubmit, formValues }
  },
  template: `
    <FormWrapper
      :content="args.content"
      :form="args.form"
      :formValues="formValues"
      @submit="onSubmit"
    />`
});

export const Initial = Template.bind({});
Initial.args = {
  form: getForm('error', true),
  content: content,
  formValues: {
    email: '12345'
  }
};

export const Test = Template.bind({});
Test.args = {
  form: form,
  content: content
};