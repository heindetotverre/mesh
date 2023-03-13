import { ref } from 'vue'
import FormWrapper from './MeshFormWrapper.vue'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'
import { email } from '../../validators/email'
import { nonumber } from '../../validators/nonumbers'
import { issamevalue } from '../../validators/issamevalue'

const content = (type, key) => contentMock[type]?.[key]

const getForm = (formKey, errorState) => {
  const form = formMock.forms[formKey]
  form.fields.forEach(field => {
    if (errorState) {
      if (field.key === 'email') {
        field.validators = [email, nonumber]
      }
      if (field.key === 'password') {
        field.validators = [nonumber]
      }
      if (field.key === 'passwordCheck') {
        field.validators = [issamevalue, nonumber]
      }
      if (field.key === 'firstName' || field.key === 'lastName') {
        field.validators = [nonumber]
      }
      if (field.key === 'checkBox') {
        field.validators = [{ name: '', validate: () => true }]
      }
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
      formValues.value = payload.formValues
      formValues.value.email = ''
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

export const Filled = Template.bind({});
Filled.args = {
  form: getForm('error', true),
  content: content,
  formValues: {
    firstName: 'Testie',
    lastName: 'McTestFace',
    email: 'nonumberemail@validator.test'
  }
};

export const PasswordCheck = Template.bind({});
PasswordCheck.args = {
  form: getForm('passwordCheck', true),
  content: content,
  formValues: {
    email: 'test@test.nl'
  }
};

export const CheckBox = Template.bind({});
CheckBox.args = {
  form: getForm('checkBox', true),
  content: content
};