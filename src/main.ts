import type { App } from 'vue';
import { Button, Input } from "./stories/index";

export default {
  install: (app: App) => {
    app.component('Button', Button);
    app.component('Input', Input);
  }
};

export { Button, Input };