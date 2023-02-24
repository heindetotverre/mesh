<template>
  <MeshForm
    :content="content"
    :name="form.meta.name"
    :formValues="formValues"
    @update:formValues="formValues = $event"
    @submit="onSubmit"
  >
    <template #fields="{ getLabel, forceValidation, formValues, onValidate }">
      <MeshInput
        v-for="field of formFields"
        :id="`${field.key}_${field.id}`"
        :is="field.component"
        class="m-t-1"
        :force-validation="forceValidation"
        :highlight-validation="field.highlightValidation"
        :label="getLabel('labels', field.key)"
        :name="field.key"
        :required="field.required"
        :type="field.type"
        :validation="field.validation"
        :variant="field.variant"
        v-model="formValues[field.key]"
        @validate="onValidate(field.key, $event)"
      >
        <template #label>{{ getLabel('labels', field.key) }}</template>
        <template #error-message>{{ getLabel('validators', field.key) }}</template>
      </MeshInput>
    </template>
    <template #error>{{ content('messages', 'global-validation-message') }}</template>
    <template #buttons="{ canSubmit, getLabel, updateFormState }">
      <MeshButton
        v-for="button of formButtons"
        class="m-t-1"
        :id="`${button.key}_${button.id}`"
        :is="button.component"
        :disabled="!canSubmit"
        :label="getLabel('labels', button.key)"
        :name="button.key"
        :type="button.type"
        @disabledClick="updateFormState({ clearForm: false, clearValidation: false, forceValidate: true })"
      />
    </template>
  </MeshForm>
</template>
<script setup lang="ts">
import { computed, ref, PropType } from 'vue'
import MeshButton from '../button/MeshButton.vue';
import MeshForm from './MeshForm.vue'
import MeshInput from '../input/MeshInput.vue';
import shareableEmits from "../shareableEmits"
import { Form } from '../../types/forms'

  const props = defineProps({
    form: {
      type: Object as PropType<Form>,
        required: true
    },
    content: {
      type: Function,
      required: true
    },
    formValues: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(shareableEmits)

  const formValues = computed({ 
    get: () => props.formValues, 
    set: (value) => emit('update:formValues', value) 
  })
  const formButtons = computed(() => props.form.fields.filter(field => field.component === 'MeshButton'))
  const formFields = computed(() => props.form.fields.filter(field => field.component === 'MeshInput'))

  const onSubmit = (event : Record<string, any>) => {
    emit('submit', event)
  }
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.m-t-1 {
  margin-top: $margin;
}
</style>