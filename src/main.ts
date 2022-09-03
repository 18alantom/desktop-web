import { createApp } from 'vue';
import App from './App.vue';
import { CounterManager } from './manager';
import './style.css';

declare module 'vue' {
  interface ComponentCustomProperties {
    counterManager: CounterManager;
  }
}

const app = createApp(App);
app.config.globalProperties.counterManager = new CounterManager();
app.mount('#app');
