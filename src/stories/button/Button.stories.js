import MeshButton from './MeshButton.vue';

export default {
  title: 'Components/Button',
  component: MeshButton,
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
  components: { MeshButton },
  setup() {
    return { args };
  },
  template: '<MeshButton v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  domclass: ['button--primary'],
  disabled: false,
  label: 'Button',
  id: 'id',
  name: 'button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  domclass: ['button--secondary'],
  disabled: false,
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