import { shallowMount } from '@vue/test-utils';
import { it, describe, expect } from 'vitest';
import MeshForm from './MeshForm.vue';

describe('MeshForm', () => {
  it('renders all form fields and buttons', () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text' },
        { key: 'field2', component: 'MeshInput', type: 'email' },
        { key: 'button1', component: 'MeshButton', type: 'button' },
        { key: 'button2', component: 'MeshButton', type: 'submit' },
      ],
    };

    const wrapper = shallowMount(MeshForm, {
      props: {
        form,
        content: () => {},
        modelValue: {},
      },
    });

    const inputFields = wrapper.findAllComponents({ name: 'MeshInput' });
    const buttonFields = wrapper.findAllComponents({ name: 'MeshButton' });

    expect(inputFields.length).toBe(2);
    expect(buttonFields.length).toBe(2);
  });

  it('emits submit event with form data when submit button is clicked', async () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text' },
        { key: 'button1', component: 'MeshButton', type: 'submit' },
      ],
    };

    const validate = { showMessage: false, canSubmit: true }

    const wrapper = shallowMount(MeshForm, {
      props: {
        form,
        content: () => {},
        modelValue: { field1: 'test value' },
      },
    });

    const inputField = wrapper.findComponent({ name: 'MeshInput' });
    const submitButton = wrapper.findComponent({ name: 'MeshButton' });

    await inputField.vm.$emit('validate', { showMessage: false, canSubmit: true });
    await submitButton.trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0][0]).toBe('test form');
    expect(wrapper.emitted('submit')[0][1]).toEqual({ field1: 'test value' });
  });

  it('validates form fields and enables/disables submit button based on validation', async () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text', required: true },
        { key: 'button1', component: 'MeshButton', type: 'submit' },
      ],
    };

    const wrapper = shallowMount(MeshForm, {
      props: {
        form,
        content: () => {},
        modelValue: {},
      },
    });

    const submitButton = wrapper.findComponent({ name: 'MeshButton' });
    const inputField = wrapper.findComponent({ name: 'MeshInput' });

    expect(submitButton.props('disabled')).toBe(true);

    await inputField.vm.$emit('validate', { showMessage: false, canSubmit: true });
    expect(submitButton.props('disabled')).toBe(false);
  });
});
