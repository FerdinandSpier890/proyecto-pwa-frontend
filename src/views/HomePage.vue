<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="center-content">
        <ion-card class="ion-card-small">
          <ion-card-content>
            <div class="login-logo">
              <img src="..\images\logo.png" alt="DevChoice" />
            </div>

            <v-form @submit.prevent="submitHandler" ref="form">
              <ion-list>
                <ion-item>
                  <ion-input class="white-text" label="Correo" labelPlacement="stacked" v-model="userName" name="userName"
                    type="text" spellcheck="false" autocapitalize="off" required></ion-input>
                    <div v-if="emailError" class="error-message">{{ emailError }}</div>
                </ion-item>

                <ion-item>
                  <ion-input class="white-text" labelPlacement="stacked" label="Contraseña" v-model="password"
                    name="password" type="password" required></ion-input>
                    <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
                </ion-item>
              </ion-list>

              <ion-row responsive-sm class="ion-padding">
                <ion-col>
                  <ion-button @click="submitHandler" expand="block">Iniciar Sesión</ion-button>
                </ion-col>
                <ion-col>
                  <ion-button @click="onSignup" color="light" expand="block">Crear Cuenta</ion-button>
                </ion-col>
              </ion-row>
            </v-form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import auth from '../logic/auth.js';
import swal from 'sweetalert';
import {
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonInput,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonImg,
  IonLabel,
  IonContent,
  IonPage
} from '@ionic/vue';

export default {
  components: {
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonInput,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonImg,
    IonLabel,
    IonContent,
    IonPage
  },
  name: 'Home',
  data() {
    return {
      userName: '',
      password: '',
      loading: false,
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(this.userName)) {
        this.emailError = 'Correo electrónico no válido';
      } else {
        this.emailError = '';
      }
    },

    validatePassword() {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.passwordError = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener al menos 8 caracteres.';
      } else {
        this.passwordError = '';
      }
    },
    async submitHandler() {
      if (this.emailError || this.passwordError) {
        return;
      }
      try {
        const user = {
          userName: this.userName,
          password: this.password,
        };
        const response = await fetch(
          "https://localhost:44344/api/AuthApi/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (!response.ok) {
          this.loading = true;
          swal("Error", "Error al Iniciar Sesión", "error")
          this.loading = false;
        } else {
          const data = await response.json();
          this.loading = true;
          swal("DevChoice", "Bienvenido", "success")
          Cookies.set("token", data.data.token);
          auth.setUserLogged(JSON.stringify(user));
          this.loading = false;
          setTimeout(() => {
            this.$router.push("empresas");
            // location.reload();
          }, 5000);
        }
      } catch (error) {
        console.log(error);
        this.loading = true;
        swal("Error", "Error al Iniciar Sesión", "error")
        console.log(error);
        this.loading = false;
      }
    },
    onSignup() {
      this.$router.push("/registro");
    },
  },
};
</script>

<style scoped>
.white-text {
  color: white;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-logo {
  padding: 20px 0;
  min-height: 100px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

/* Clase de estilo para reducir el tamaño del ion-card */
.ion-card-small {
  max-width: 300px;
  /* Puedes ajustar el tamaño según tus preferencias */
}
</style>
