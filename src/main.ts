import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "@/main.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faHome, faSquarePen, faReceipt } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(
  faAddressCard,
  faHome,
  faSquarePen,
  faReceipt,
);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app');
