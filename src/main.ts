import type { App } from 'vue';
import { MeshButton, MeshInput, MeshForm } from "./stories/index";
import { Forms, Form, FormField } from '../types/forms';

export default {
  install: (app: App) => {
    app.component('MeshButton', MeshButton);
    app.component('MeshInput', MeshInput);
    app.component('MeshForm', MeshForm);
  }
};

export { MeshButton, MeshInput, MeshForm };
export type { Forms, Form, FormField }