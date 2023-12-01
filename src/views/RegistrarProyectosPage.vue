<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Registrar Proyecto</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-center">Registrar Nuevo Proyecto</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <v-form @submit.prevent="registrarProyecto" ref="form">
              <ion-list>
                <ion-item>
                  <ion-label position="floating">Nombre del Proyecto</ion-label>
                  <ion-input v-model="nombre" required></ion-input>
                </ion-item>
  
                <ion-item>
                  <ion-label position="floating">Duración del Proyecto</ion-label>
                  <ion-input v-model="duracion" required></ion-input>
                </ion-item>
  
                <ion-item>
                  <ion-label position="floating">Softwares que se utilizarán</ion-label>
                  <ion-input v-model="softwares" required></ion-input>
                </ion-item>
  
                <ion-item>
                  <ion-label position="floating">Empresa que realiza el proyecto</ion-label>
                  <ion-select v-model="empresa" required>
                    <ion-select-option v-for="item in empresas" :key="item.idEmpresa" :value="item.idEmpresa">{{ item.nombreEmpresa }}</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-list>
  
              <ion-button expand="full" color="primary" type="submit" @click="registrarProyecto">Registrar</ion-button>
            </v-form>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import swal from 'sweetalert';
  import {
    IonCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList
  } from '@ionic/vue';
  
  export default {
    components: {
      IonCard,
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonItem,
      IonLabel,
      IonInput,
      IonSelect,
      IonSelectOption,
      IonButton,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonList
    },
    name: 'RegistrarProyecto',
    data() {
      return {
        nombre: '',
        duracion: '',
        softwares: '',
        empresa: '',
        empresas: [],
      };
    },
    async mounted() {
      // Obtener la lista de empresas de la otra API
      await this.fetchEmpresas();
    },
    methods: {
      async fetchEmpresas() {
        try {
          const token = this.obtenerToken();

          const response = await fetch("https://EmpresasApiPwa.somee.com/api/Empresas", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
          if (response.ok) {
            const data = await response.json();
            this.empresas = data;
            console.log(data);
          } else {
            console.error("Error al obtener la lista de empresas");
          }
        } catch (error) {
          console.error("Error al obtener la lista de empresas:", error);
        }
      },
      async registrarProyecto() {
        const token = this.obtenerToken();
        // Crea un objeto con los datos del proyecto
        const proyectoData = {
          idProyecto: generateGUID(),
          nombreProyecto: this.nombre,
          duracionProyecto: this.duracion,
          softwareProyecto: this.softwares,
          empresaProyecto: this.empresa,
        };
  
        try {
          const response = await fetch("https://ProyectosApiPwa.somee.com/api/Proyectos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(proyectoData),
          });
  
          if (response.ok) {
            swal("DevChoice", "Proyecto registrado correctamente", "success");
            this.$router.push("/empresas");
          } else {
            swal("DevChoice", "Error al registrar el proyecto", "error");
          }
        } catch (error) {
          swal("DevChoice", error, "error");
        }
      },
      obtenerToken() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        },
    },
  };
  
  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  </script>
  
  <style scoped>
  /* Estilos CSS específicos para esta vista */
  .ion-card-title {
    font-size: 1.5rem;
  }
  
  .ion-button {
    margin-top: 16px;
  }
  </style>
  