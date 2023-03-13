import { app } from '@storybook/vue3';
import MeshTextInput from '../src/stories/input/MeshTextInput.vue'
import MeshCheckboxInput from '../src/stories/input/MeshCheckboxInput.vue'

app.component('MeshTextInput', MeshTextInput);
app.component('MeshCheckboxInput', MeshCheckboxInput);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}