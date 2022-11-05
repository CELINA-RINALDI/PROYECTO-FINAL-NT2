import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/main.css'
import Home from './components/Home.vue'
import Segmentos from './components/Segmentos.vue'
import Ahorros from './components/Ahorros.vue'
import Carga from './components/Carga.vue'
import UserLogin from './components/UserLogin.vue'
import "bootstrap/dist/css/bootstrap.css";
import pinia from '@/store/index';



const routes = [
  {path: '/home',
component: Home },
{path: '/segmentos',
component: Segmentos },
{path: '/ahorros',
component: Ahorros },
{path: '/carga',
component: Carga },
{path: '/userlogin',
component: UserLogin },
]

const router = new VueRouter({
  routes,
})

Vue.use(VueRouter)  // Inyecta algunos utiles. 


new Vue({
  router,
  render: (h) => h(App), 
  pinia,
}).$mount('#app')
