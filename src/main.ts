import { createApp } from 'vue';
import App from './App.vue';
import { CounterManager } from './manager';
import './style.css';

const app = createApp(App);
app.config.globalProperties.counterManager = new CounterManager(window.db);
app.mount('#app');
