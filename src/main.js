import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import progressbarConfig from '@/config/progressbar.config';
import VueProgressBar from "@aacassandra/vue3-progressbar";


const app = createApp(App)

 app.use(VueProgressBar,progressbarConfig)
app.use(router)
app.use(store)
app.mount('#app')
