import type { App } from 'vue';
import MeshButton from './stories/button/MeshButton.vue';
import MeshInput from './stories/input/MeshInput.vue';
import MeshForm from './stories/form/MeshForm.vue';
import { Form, FormField } from '../types/forms';

export default {
  install: (app: App) => {
    app.component('MeshButton', MeshButton);
    app.component('MeshInput', MeshInput);
    app.component('MeshForm', MeshForm);
  }
};

export { MeshButton, MeshInput, MeshForm };
export type { Form, FormField }