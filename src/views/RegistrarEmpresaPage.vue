<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registrar Empresa</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="ion-text-center">Registrar Nueva Empresa</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <v-form @submit.prevent="registrarEmpresa" ref="form">
            <ion-list>
              <ion-item>
                <ion-label position="floating">Nombre de la Empresa</ion-label>
                <ion-input v-model="nombre" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Dirección</ion-label>
                <ion-input v-model="direccion" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">URL de la Imagen</ion-label>
                <ion-input v-model="imagenURL" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Pequeña Descripción</ion-label>
                <ion-textarea v-model="descripcion"></ion-textarea>
              </ion-item>
            </ion-list>

            <ion-button expand="full" color="primary" type="submit">Registrar</ion-button>
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
  IonToolbar
} from '@ionic/vue';

export default {
  components: {
    IonCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  name: 'RegistrarEmpresa',
  data() {
    return {
      nombre: '',
      direccion: '',
      imagenURL: '',
      descripcion: '',
    };
  },
  methods: {
    registrarEmpresa() {
      swal("Registro Exitoso", 'Empresa registrada correctamente', "success");
    },
  },
};
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
