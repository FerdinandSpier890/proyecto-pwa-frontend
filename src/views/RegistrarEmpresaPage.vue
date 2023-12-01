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

            <ion-button expand="full" color="primary" type="submit" @click="registrarEmpresa">Registrar</ion-button>
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
    IonList,
    IonTextarea } from '@ionic/vue';

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
      IonList,
      IonTextarea
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
    async registrarEmpresa() {
      const token = this.obtenerToken();
      console.log(token)
      // Asegúrate de que los datos del formulario se actualicen correctamente
      await this.$nextTick();

      function generateGUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      console.log('Datos del formulario:', this.nombre, this.direccion, this.imagenURL, this.descripcion);

      // Crea un objeto con los datos de la empresa
      const empresaData = {
        idEmpresa: generateGUID(), // Genera un nuevo GUID
        nombreEmpresa: this.nombre,
        direccionEmpresa: this.direccion,
        imagenEmpresa: this.imagenURL,
        descripcionEmpresa: this.descripcion,
      };

      console.log('Datos enviados:', empresaData);

      try {
        const response = await fetch("https://EmpresasApiPwa.somee.com/api/Empresas", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(empresaData),
        });

        if (response.ok) {
          swal("DevChoice", "La Empresa se Registró Correctamente", "success");
          this.$router.push("/empresas")
        } else {
          swal("DevChoice", "Error al Registrar la Empresa", "error")
        }
      } catch (error) {
        swal("DevChoice", error, "error")
        console.log(error)
      }
    },
    obtenerToken() {
      return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
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
