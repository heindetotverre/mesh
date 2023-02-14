import UiButton from './Button.vue';

export default {
  title: 'Components/Button',
  component: UiButton,
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    domclass: {
      control: { type: 'select' },
      options: ['button--primary','button--secondary']
    },
  },
};

const Template = (args) => ({
  components: { UiButton },
  setup() {
    return { args };
  },
  template: '<ui-button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  domclass: 'button--primary',
  label: 'Button',
  id: 'id',
  name: 'button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  domclass: 'button--secondary',
  label: 'Button',
  id: 'id',
  name: 'button'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Button',
  id: 'id',
  name: 'button'
};