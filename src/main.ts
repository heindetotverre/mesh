import type { App } from 'vue';
import { MeshButton, MeshInput, MeshForm } from "./stories/index";
import { Forms, Form, FormField } from '../types/forms';

const prefix = 'Mesh'

export default {
  install: (app: App) => {
    app.component(`${prefix}Button`, MeshButton);
    app.component(`${prefix}Input`, MeshInput);
    app.component(`${prefix}Input`, MeshForm);
  }
};

export { MeshButton, MeshInput, MeshForm };
export type { Forms, Form, FormField }