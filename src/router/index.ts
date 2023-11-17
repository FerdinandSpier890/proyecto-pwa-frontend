import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegistroPage from '../views/RegistroPage.vue';
import RegistrarEmpresaPage from '../views/RegistrarEmpresaPage.vue';
import RegistrarProyectoPage from '../views/RegistrarProyectosPage.vue';
import EmpresasPage from '../views/EmpresasPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroPage
  },
  {
    path: '/registrarempresa',
    name: 'RegistrarEmpresa',
    component: RegistrarEmpresaPage
  },
  {
    path: '/registrarproyecto',
    name: 'RegistrarProyecto',
    component: RegistrarProyectoPage
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: EmpresasPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
