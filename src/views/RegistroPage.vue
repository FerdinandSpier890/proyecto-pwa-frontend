<template>
  <ion-page  class="page" :style="{'--ion-background-color': isDarkMode ? '#dcdcdc' : ''}">
    <ion-header class="header">
        <ion-buttons>
          <ion-button>
            <ion-toolbar>
            </ion-toolbar>
          </ion-button>
        </ion-buttons>
    </ion-header>
    <ion-content :class="{'dark-mode-content': isDarkMode}">
      <br>
      <br>
      <div class="form-container" :class="{'white-form': isDarkMode}">
        <form @submit.prevent="submitHandler" ref="form">
          <div>
            <div>
              <ion-title class="title-dark">Registro</ion-title>
              <br>
              <img src="../images/Logo.png" alt="Logo" class="small-header-image" />
            </div>
            <div class="white-list" :class="{'dark-mode-list': isDarkMode}">
              <!-- Campo Email -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Email</ion-label>
                <ion-input v-model="email" placeholder="user@example.com " class="white-input" style="color: black;"  type="email" 
                spellcheck="false" autocapitalize="off" required @input="validateEmail"></ion-input>
                <div v-if="emailError" class="error-message">{{ emailError }}</div>
              </div>
              <br>
              <!-- Campo Nombre -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Nombre</ion-label>
                <ion-input v-model="name" placeholder="Nombre(s)" class="white-input" style="color: black;"  type="text" 
                spellcheck="false" autocapitalize="off" required></ion-input>
                <div v-if="nameError" class="error-message">{{ nameError }}</div>
              </div>
              <br>
              <!-- Campo télefono -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Número de télefono</ion-label>
                <ion-input v-model="phoneNumber" placeholder="10 digitos" class="white-input" style="color: black;"  type="tel" 
                spellcheck="false" autocapitalize="off"  required @input="validatePhoneNumber"></ion-input>
                <div v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</div>
              </div>
              <br>
              <!-- Campo contraseña con funcionalidad de mostrar/ocultar -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Contraseña</ion-label>
                <div class="password-input">
                  <ion-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Ingresa una contraseña segura" class="white-input"
                   style="color: black;" required  @input="validatePassword"></ion-input>
                  <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
                  <!-- Botón para mostrar/ocultar la contraseña -->
                  <ion-button fill="clear" size="small" @click="togglePasswordVisibility" class="password-button" style="color: black;">
                    {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                  </ion-button>
                </div>
              </div>
              <br>
              <!-- Campo rol -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Rol</ion-label>
                <ion-input v-model="role" placeholder="Rol de tu empresa" class="white-input" style="color: black;"  type="text" 
                spellcheck="false" autocapitalize="off"  required></ion-input>
                <div v-if="roleError" class="error-message">{{ roleError }}</div>
              </div>
              <!-- Botón para Iniciar Sesión -->
              <ion-button @click="submitHandler" expand="full" type="submit" class="blue-button">
              Registrarse
              </ion-button>
              <br>
              <br>
              <!-- Enlace "Registrarse" -->
              <div class="password-input">
              <a class="title-register">¿Ya tienes una cuenta?</a>
              <a @click="onLogin" class="register-link"> Inicia sesión aquí</a>
              </div>
              <br>
            </div>
          </div>
        </form>
        <br>
      </div>
    </ion-content>
  </ion-page>
</template>
  
  <script>
  import { ref } from 'vue';
  import Cookies from 'js-cookie';
  import swal from 'sweetalert';
  import auth from '../logic/auth.js';
  import { IonInput, IonPage, IonTitle, IonButton, IonToolbar, IonContent, IonHeader, IonLabel,IonButtons } from '@ionic/vue';
  
  export default {
    components: {
      IonInput,
      IonButton,
      IonLabel,
      IonTitle,
      IonToolbar,
      IonHeader,
      IonContent,
      IonPage,
      IonButtons
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
        showPassword: false,
        isDarkMode: false, 
      };
    },
    methods: {
      togglePasswordVisibility () {
      this.showPassword = !this.showPassword;
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },

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
  
      // validatePassword() {
      //   const passwordPattern = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.\W).{8,}$/;
      //   if (!passwordPattern.test(this.password)) {
      //     this.passwordError = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener al menos 8 caracteres.';
      //   } else {
      //     this.passwordError = '';
      //   }
      // },
  
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
            "https://www.AuthApiPwa.somee.com/api/AuthApi/register",
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
            swal("Registro exitoso", "Bienvenido", "success");
            this.$router.push("/home");
            this.loading = false;
          } else {
            this.loading = true;
            swal("Registro exitoso", "Bienvenido", "success");
            this.loading = false;
            this.$router.push("/home");
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
  .page {
  --ion-background-color: #dcdcdc;
}

.header {
  background-color: #1B4B66;
}

.dark-mode-content {
  background-color: white;
}

.white-form {
  background-color: white;
}

.white-input {
  --color: white;
}

.white-text {
  color: white;
}

.title-dark {
  color: black;
  text-align: center;
  font-size:25px;
}

.title-register {
  color: black;
  text-align: center;
  font-size:14px;
}

.transparent-button {
  --border-width: 0;
  --box-shadow: none;
  --background: white;
  color: navy;
  font-weight: bold;
  font-size: 12px;
}

.blue-button {
  --background:#1B4B66;
  --background-activated:#1B4B66;
  --border-width: 1px;
  --border-radius: 5px;
  --box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  margin-top: 10px; 
}

.register-link {
  color: blue; 
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  font-size: 14px;
}

.form-container {
  padding-bottom: 150px;
  max-width: 50%;
  padding: 10px;
  max-width: 350px;
  max-height: 900px;
  margin: 0 auto;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  background-color: whitesmoke;
}

.small-header-image {
  max-width: 150px;
  max-height: 150px;
  display: block;
  margin: 0 auto;
  text-align: center;
}

.password-input {
  display: flex;
  justify-content: space-between;
}

.password-button {
  font-size: 12px;
  margin-left: 10px;
  color: black; 
}
  </style>