<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="background-color: #12486B; border-bottom: 1px solid #419197;">
                <div class="login-logo">
                    <img src="..\images\logo.png" alt="DevChoice" />
                </div>
                <ion-buttons slot="end">
                    <ion-button @click="openCamera">
                    <ion-icon :icon="camera" class="icon-camera"></ion-icon>
                    </ion-button>
                    <ion-button style="font-size: 17.5px; color: #FFFFFF;" @click="agregarEmpresa">
                        <i class="fas fa-plus fa-lg" style="margin-right: 10px;"></i> Agregar Empresa
                    </ion-button>
                    <ion-button style="font-size: 17.5px; color: #FFFFFF;" @click="agregarProyecto">
                        <i class="fas fa-plus fa-lg" style="margin-right: 10px;"></i> Agregar Proyecto
                    </ion-button>
                    <ion-button style="font-size: 17.5px; color: #FFFFFF;" @click="cerrarSesion">
                        <i class="fas fa-arrow-right-from-bracket fa-lg" style="margin-right: 10px;"></i> Cerrar Sesion
                    </ion-button>
                </ion-buttons>
                <div slot="end" style="display: flex; align-items: center;">
                    <ion-avatar slot="start">
                        <img src="..\images\perfil.png" alt="DevChoice" />
                    </ion-avatar>
                    <ion-label style="color: #FFFFFF; margin-left: 10px;">
                        {{ usuarioLogueado }}
                    </ion-label>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content style="background-color: #419197;" ref="content">
            <ion-row class="d-flex align-center justify-center animated-row fade-in"
                style="background-color: transparent; border-radius: 10px;">
                <ion-col cols="12" md="6" class="animated-column fade-in">
                    <ion-item class="ion-align-items-center" style="background-color: transparent; border-radius: 10px;">
                        <ion-icon slot="start" name="search" style="color: black;"></ion-icon>
                        <ion-label position="floating" style="color: black;">Buscar por Nombre</ion-label>
                        <ion-input v-model="busqueda" @input="buscarEmpresa" style="color: black;"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>

            <ion-row class="d-flex align-center justify-center">
                <ion-col v-for="(empresa, index) in empresasFiltradas" :key="index" size-md="3">
                    <ion-card :id="'card-' + empresa.id" class="hover-scale animated-card fade-in mx-auto align-center"
                        max-width="auto"
                        style="border: 5px solid #12486B; border-radius: 10px; background-color: #419197; color: #FF0000"
                        elevation="10">
                        <ion-img :src="empresa.imagenEmpresa" height="200px" style="border-radius: 100px;" />
                        <ion-card-header class="font-weight-bold" style="color: #FFFFFF;">
                            <ion-card-title style="font-size: 25px; color: #F2E3DB">{{ empresa.nombreEmpresa
                            }}</ion-card-title>
                        </ion-card-header>
                        <hr style="border-color: #146b63;" />
                        <ion-card-content>
                            <ion-card-subtitle>
                                <ion-card-text class="font-weight-bold" style="color: #F2E3DB; font-size: 17.5px">{{
                                    empresa.descripcionEmpresa }}</ion-card-text>
                                <br /> <br />
                                <!-- Agrega más detalles de la empresa según tus necesidades -->
                                <ion-card-text class="font-weight-bold" style="color: #F2E3DB; font-size: 17.5px">{{
                                    empresa.direccionEmpresa }}</ion-card-text>
                                <br /> <br />
                            </ion-card-subtitle>
                            <ion-row class="ion-align-items-center ion-justify-content-center">
                                <ion-col>
                                    <ion-button expand="full" color="primary" @click="verProyectos(index)">
                                        <i class="fas fa-eye fa-lg" style="margin-right: 10px;"></i> Ver Proyectos
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>

            <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="12">
                    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                        <ion-fab-button color="#78D6C6" @click="agregarEmpresa">
                            <ion-icon name="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-col>
            </ion-row>
        </ion-content>

        <!-- Modal de Proyectos -->
        <ion-modal :is-open="modalAbierto" @dismiss="cerrarModalProyectos">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Proyectos de la Empresa</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="cerrarModalProyectos">
                            <i class="fa-solid fa-xmark" style="margin-right: 10px; color: #000;"></i>Cerrar
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-list>
                    <ion-item v-for="(proyecto, index) in proyectosModal" :key="index" class="proyecto-item">
                        <ion-label>
                            <h2 class="proyecto-nombre">{{ proyecto.nombreProyecto }}</h2>
                            <p class="proyecto-duracion">Duración: {{ proyecto.duracionProyecto }}</p>
                            <p class="proyecto-software">Software: {{ proyecto.softwareProyecto }}</p>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-modal>

    </ion-page>
</template>
<script>
import Cookies from 'js-cookie';
import auth from '../logic/auth.js';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons'; // Importa el ícono de la cámara
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
    IonPage,
    IonAvatar
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
        IonPage,
        IonAvatar
    },
    name: 'Empresas',
    data() {
        return {
            empresas: [],
            busqueda: '',
            modalAbierto: false,
            proyectosModal: [],
            usuarioLogueado: '',
            notifications: [], // Se añade la propiedad de notificaciones
            camera, // Asegúrate de tener la coma al final de esta línea
            imageDataUrl: '', // Agrega esta línea para almacenar la imagen de la cámara
        };
    },
    computed: {
        empresasFiltradas() {
            const busquedaLowerCase = this.busqueda.toLowerCase().trim();
            return this.empresas.filter((empresa) =>
                empresa.nombreEmpresa.toLowerCase().includes(busquedaLowerCase)
            );
        },
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
        async cargarEmpresas() {
            const token = this.obtenerToken();
            console.log(token)
            try {
                console.log('Token:', token);
                const response = await fetch('https://EmpresasApiPwa.somee.com/api/Empresas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las empresas');
                }
                const data = await response.json();
                this.empresas = data;
                console.log(data);
                console.log(response)
            } catch (error) {
                //console.error('Error al obtener las empresas:', error.message);
                console.log(error)
            }
        },
        verProyectos(index) {
            const idEmpresa = this.empresas[index]?.idEmpresa;
            if (!idEmpresa) {
                console.error('ID de la empresa no válido');
                return;
            }
            this.obtenerProyectos(idEmpresa);
        },
        editarEmpresa(index) {
            console.log('Editar Empresa', index);
        },
        actualizarEmpresa(index) {
            console.log('Actualizar Empresa', index);
        },
        agregarEmpresa() {
            this.$router.push("/registrarempresa")
        },
        agregarProyecto() {
            this.$router.push("/registrarproyecto")
        },
        obtenerToken() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        },
        async obtenerProyectos(idEmpresa) {
            try {
                const token = this.obtenerToken();
                const response = await fetch(`https://ProyectosApiPwa.somee.com/api/Proyectos?empresaProyecto=${idEmpresa}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los proyectos');
                }
                const proyectos = await response.json();
                this.mostrarModalProyectos(proyectos);
                console.log(proyectos)
                console.log(idEmpresa)
            } catch (error) {
                console.error('Error al obtener los proyectos:', error.message);
                console.log(error)
            }
        },
        async mostrarModalProyectos(proyectos) {
            try {
                this.proyectosModal = proyectos;
                this.modalAbierto = true;
            } catch (error) {
                console.error('Error al mostrar el modal de proyectos:', error);
            }
        },
        cerrarModalProyectos() {
            this.modalAbierto = false;
        },
        cerrarSesion() {
            this.agregarNotificacion('Cierre de sesión exitoso', 'exito');
            auth.deleteUserLogged();
            location.reload();
            this.$router.go(0);
        },
        // Método de notificación de ejemplo
        agregarNotificacion(mensaje, tipo = 'exito') {
            this.notifications.push({ message: mensaje, type: tipo });
        },
    },
    created() {
        this.cargarEmpresas();
        const usserLoggedCookie = Cookies.get('userLogged');
        if (usserLoggedCookie) {
            const usuario = JSON.parse(decodeURIComponent(usserLoggedCookie));
            this.usuarioLogueado = usuario.userName;
        }
    },
};
</script>

<style scoped>
ion-item {
    --background: #78D6C6;
    --color: #FFFFFF;
}

ion-card {
    --border-color: #78D6C6;
    --border-radius: 10px;
    --background: #263A29;
    --color: #FFFFFF;
}

ion-button {
    --background: #78D6C6;
    --color: #FFFFFF;
}

ion-fab-button {
    --background: #78D6C6;
    --color: #FFFFFF;
}

.proyecto-item {
    background-color: transparent;
    border-bottom: 1px solid #78D6C6;
    padding: 10px;
}

.proyecto-nombre {
    font-size: 20px;
    color: #000;
    font-weight: bold;
}

.proyecto-duracion,
.proyecto-software {
    font-size: 16px;
    color: #000;
}

.login-logo {
    padding: 10px 10px;
}

/* Estilos para las notificaciones */
.notifications {
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px;
    z-index: 9999;
}

.notification {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.exito {
    background-color: #78D6C6;
    color: #FFFFFF;
}

.error {
    background-color: #FF0000;
    color: #FFFFFF;
}
.icon-camera{
color: white;
}
</style>