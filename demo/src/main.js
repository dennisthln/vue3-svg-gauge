import { createApp } from 'vue'
import App from './App.vue'
import VueSvgGauge from '../../src/index';

const app = createApp(App)

app.use(VueSvgGauge)

app.mount('#app')
