import { app } from '@storybook/vue3';
import MeshInput from '../src/stories/input/MeshInput.vue'

app.component('MeshInput', MeshInput);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}