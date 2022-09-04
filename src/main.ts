import { createApp } from 'vue';
import { APIDatabase } from './api';
import App from './App.vue';
import { CounterManager } from './manager';
import './style.css';

const app = createApp(App);
const db = window.db ?? new APIDatabase();
app.config.globalProperties.counterManager = new CounterManager(db);
app.mount('#app');
