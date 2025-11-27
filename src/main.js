import '@gallery/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';

import router from '../src/router.js'
import App from './App.vue'

createApp(App).use(router).use(createPinia()).mount('#app')
