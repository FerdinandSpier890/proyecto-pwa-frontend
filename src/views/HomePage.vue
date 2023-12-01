<template>
  <ion-page  class="page" :style="{'--ion-background-color': isDarkMode ? '#dcdcdc' : ''}">
    <ion-header class="header">
        <ion-buttons>
              <ion-button @click="openCamera">
                    <ion-icon :icon="camera" class="icon-camera"></ion-icon>
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
              <br>
              <br>
              <ion-title class="title-dark">Iniciar Sesión</ion-title>
              <br>
              <img src="../images/logo.png" alt="Logo" class="small-header-image" />
            </div>
            <br>
            <div class="white-list" :class="{'dark-mode-list': isDarkMode}">
              <!-- Campo correo electrónico -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Usuario</ion-label>
                <ion-input v-model="userName" type="text" placeholder="usuario" class="white-input" style="color: black;" required></ion-input>
                <div v-if="emailError" class="error-message">{{ emailError }}</div>
              </div>
              <br>
              <!-- Campo contraseña con funcionalidad de mostrar/ocultar -->
              <div :class="{'white-text': isDarkMode}">
                <ion-label>Contraseña</ion-label>
                <div class="password-input">
                  <ion-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña" class="white-input" style="color: black;" required></ion-input>
                  <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
                  <!-- Botón para mostrar/ocultar la contraseña -->
                  <ion-button fill="clear" size="small" @click="togglePasswordVisibility" class="password-button" style="color: black;">
                    {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                  </ion-button>
                </div>
              </div>
              <br>
              <!-- Botón para Iniciar Sesión -->
              <ion-button expand="full" type="submit" class="blue-button">
              Iniciar Sesión
              </ion-button>
              <br>
              <br>
              <!-- Enlace "Registrarse" -->
              <div class="password-input">
              <a class="title-register">¿Aun no tienes una cuenta?</a>
              <a @click="onSignup" class="register-link"> Resgistrate aquí</a>
              </div>
              <br>
              <br>
            </div>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import Cookies from 'js-cookie';
import auth from '../logic/auth.js';
import swal from 'sweetalert';
import { IonInput, IonPage, IonTitle, IonButton, IonContent, IonHeader, IonLabel, IonToolbar, IonButtons, IonIcon} from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons'; // Importa el ícono de la cámara

export default {
  components: {
    IonInput,
    IonButton,
    IonTitle,
    IonLabel,
    IonHeader,
    IonContent,
    IonPage,
    IonToolbar,
    IonButtons,
    IonIcon,
  },
  name: 'home',
  data() {
    return {
      userName: '',
      password: '',
      loading: false,
      emailError: '',
      passwordError: '',
      showPassword: false,
      isDarkMode: false, 
      camera,
      imageDataUrl:'',
    };
  },
  methods: {
    async openCamera() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera, // Asegúrate de usar CameraSource.Camera
        });
        this.imageDataUrl = image.dataUrl;
      } catch (error) {
        console.error('Error al abrir la cámara', error);
      }
    },

    togglePasswordVisibility () {
      this.showPassword = !this.showPassword;
    }
    ,

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },


    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(this.userName)) {
        this.emailError = 'Correo electrónico no válido';
      } else {
        this.emailError = '';
      }
    },

    //validatePassword() {
    //const passwordPattern = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.\W).{8,}$/;
    //if (!passwordPattern.test(this.password)) {
    //  this.passwordError = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener al menos 8 caracteres.';
    //} else {
    //  this.passwordError = '';
    //}
    //},
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
          "https://www.AuthApiPwa.somee.com/api/AuthApi/login",
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
            this.$router.push("/empresas");
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
  font-size:30px;
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
  max-width: 200px;
  max-height: 200px;
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

.icon-camera{
color: white;
}
</style>