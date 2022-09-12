import { createApp } from 'vue';
import { APICaller } from './api';
import App from './App.vue';
import { CounterManager } from './manager';
import './style.css';

const app = createApp(App);
const db = window.db ?? new APICaller(getAPIURL());
app.config.globalProperties.counterManager = new CounterManager(db);
app.mount('#app');

function getAPIURL(): string {
  if (import.meta.env.MODE === 'development') {
    const port = import.meta.env.VITE_PORT_SERVER;
    return `http://0.0.0.0:${port}/api`;
  }

  return '/api';
}
