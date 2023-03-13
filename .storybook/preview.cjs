import { app } from '@storybook/vue3';
import MeshInput from '../src/stories/input/MeshInput.vue'
import MeshSelect from '../src/stories/select/MeshSelect.vue'

app.component('MeshInput', MeshInput);
app.component('MeshSelect', MeshSelect);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}