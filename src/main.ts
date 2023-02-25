import type { App } from 'vue';
import MeshButton from './stories/button/MeshButton.vue';
import MeshInput from './stories/input/MeshInput.vue';
import MeshFormWrapper from './stories/form/MeshFormWrapper.vue';
import MeshForm from './stories/form/MeshForm.vue';
import {
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
} from './types/forms';

export default {
  install: (app: App) => {
    app.component('MeshButton', MeshButton);
    app.component('MeshInput', MeshInput);
    app.component('MeshForm', MeshForm);
    app.component('MeshFormWrapper', MeshFormWrapper);
  }
};
export { MeshButton, MeshInput, MeshForm, MeshFormWrapper };
export type { 
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
}