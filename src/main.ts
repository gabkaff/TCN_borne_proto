import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { startPeriodicRefresh } from './utils/refresh';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

// Démarre le rafraîchissement périodique pour les bornes
startPeriodicRefresh();
