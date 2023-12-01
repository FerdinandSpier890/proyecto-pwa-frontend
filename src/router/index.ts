import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegistroPage from '../views/RegistroPage.vue';
import RegistrarEmpresaPage from '../views/RegistrarEmpresaPage.vue';
import RegistrarProyectoPage from '../views/RegistrarProyectosPage.vue';
import EmpresasPage from '../views/EmpresasPage.vue';

import Cookies from "js-cookie";
import swal from "sweetalert";

function isAuthenticated() {
  const token = Cookies.get("token");
  return token && token !== "undefined";
}

const requireAuth = (to: any, from: any, next: any) => {
  if (!isAuthenticated()) {
    swal("DevChoice", "Recuerda que Primero Debes Iniciar Sesión Para Ir A Los Sitios", "error")
    next("/");
  } else {
    next();
  }
};


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
    component: RegistrarEmpresaPage,
    beforeEnter: requireAuth
  },
  {
    path: '/registrarproyecto',
    name: 'RegistrarProyecto',
    component: RegistrarProyectoPage,
    beforeEnter: requireAuth
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: EmpresasPage,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
