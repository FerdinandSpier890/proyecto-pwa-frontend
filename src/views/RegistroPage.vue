<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Registro</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content responsive-sm class="ion-padding">
        <div class="center-content">
          <ion-card class="ion-card-small">
            <ion-card-content>
              <div class="login-logo">
                <img src="..\images\logo.png" alt="DevChoice" />
              </div>
  
              <v-form @submit.prevent="submitHandler" ref="form">
                <ion-list>
                  <ion-item>
                    <ion-input class="white-text" label="Email" labelPlacement="stacked" v-model="email" name="email"
                      type="email" spellcheck="false" autocapitalize="off" required @input="validateEmail"></ion-input>
                    <div v-if="emailError" class="error-message">{{ emailError }}</div>
                  </ion-item>
  
                  <ion-item>
                    <ion-input class="white-text" labelPlacement="stacked" label="Nombre" v-model="name"
                      name="name" type="text" required></ion-input>
                    <div v-if="nameError" class="error-message">{{ nameError }}</div>
                  </ion-item>
  
                  <ion-item>
                    <ion-input class="white-text" label="Número de teléfono" labelPlacement="stacked" v-model="phoneNumber"
                      name="phoneNumber" type="tel" required @input="validatePhoneNumber"></ion-input>
                    <div v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</div>
                  </ion-item>
  
                  <ion-item>
                    <ion-input class="white-text" label="Contraseña" labelPlacement="stacked" v-model="password"
                      name="password" type="password" required @input="validatePassword"></ion-input>
                    <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
                  </ion-item>
  
                  <ion-item>
                    <ion-input class="white-text" label="Rol" labelPlacement="stacked" v-model="role"
                      name="role" type="text" required></ion-input>
                    <div v-if="roleError" class="error-message">{{ roleError }}</div>
                  </ion-item>
                </ion-list>
  
                <ion-row responsive-sm class="ion-padding">
                  <ion-col>
                    <ion-button @click="submitHandler" expand="block">Registrarse</ion-button>
                  </ion-col>
                  <ion-col>
                    <ion-button @click="onLogin" color="light" expand="block">Iniciar Sesión</ion-button>
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
  import swal from 'sweetalert';
  import auth from '../logic/auth.js';
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
    name: 'Registro',
    data() {
      return {
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        role: '',
        emailError: '',
        nameError: '',
        phoneNumberError: '',
        passwordError: '',
        roleError: '',
        loading: false,
      };
    },
    methods: {
      validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(this.email)) {
          this.emailError = 'Correo electrónico no válido';
        } else {
          this.emailError = '';
        }
      },
  
      validatePhoneNumber() {
        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(this.phoneNumber)) {
          this.phoneNumberError = 'Número de teléfono no válido (debe contener 10 dígitos)';
        } else {
          this.phoneNumberError = '';
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
        if (this.emailError || this.nameError || this.phoneNumberError || this.passwordError || this.roleError) {
          return;
        }
  
        try {
          const user = {
            email: this.email,
            name: this.name,
            phoneNumber: this.phoneNumber,
            password: this.password,
            role: this.role,
          };
          const response = await fetch(
            "https://localhost:44344/api/AuthApi/register",
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
            swal("Error", "Error en el registro", "error");
            this.loading = false;
          } else {
            this.loading = true;
            swal("Registro exitoso", "Bienvenido", "success");
            this.loading = false;
            // Puedes redirigir al usuario a la página de inicio de sesión aquí si lo deseas.
            // this.$router.push("/home");
          }
        } catch (error) {
          console.log(error);
          this.loading = true;
          swal("Error", "Error en el registro", "error");
          console.log(error);
          this.loading = false;
        }
      },
      onLogin() {
        // Puedes redirigir al usuario a la página de inicio de sesión aquí si lo deseas.
        this.$router.push("/");
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
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }
  /* Clase de estilo para reducir el tamaño del ion-card */
  .ion-card-small {
    max-width: 300px;
    /* Puedes ajustar el tamaño según tus preferencias */
  }
  </style>
  