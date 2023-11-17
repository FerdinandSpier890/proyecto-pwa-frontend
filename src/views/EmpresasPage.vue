<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Listado de Empresas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
                        <ion-searchbar v-model="busqueda" placeholder="Buscar por Nombre"></ion-searchbar>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col v-for="(empresa, index) in empresasFiltradas" :key="index" size="12">
                        <ion-card class="empresa-card">
                            <ion-row align-items-center>
                                <ion-col size="4">
                                    <ion-img :src="empresa.imagenEmpresa" class="empresa-imagen"></ion-img>
                                </ion-col>

                                <ion-col size="8">
                                    <ion-card-content class="ion-no-padding">
                                        <ion-text class="empresa-nombre">{{ empresa.nombreEmpresa }}</ion-text>
                                        <!-- Agrega la descripción aquí -->
                                    </ion-card-content>

                                    <ion-card-actions class="ion-text-right">
                                        <!-- Mueve los botones al final del ion-card -->
                                        <ion-button color="primary" @click="verProyectos(index)">Ver Proyectos</ion-button>
                                        <ion-button color="info" @click="editarEmpresa(index)">Editar Empresa</ion-button>
                                        <ion-button color="success" @click="actualizarEmpresa(index)">Actualizar Empresa</ion-button>
                                    </ion-card-actions>
                                </ion-col>
                            </ion-row>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- Mueve el botón fuera del ion-grid para asegurar su visibilidad -->
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
    </ion-page>
</template>
  
<script>
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
    name: 'Empresas',
    data() {
        return {
            empresas: [],
            busqueda: '',
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
        async cargarEmpresas() {
            try {
                const token = this.obtenerToken();
                const response = await fetch('https://localhost:44313/api/Empresas', {
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
            } catch (error) {
                console.error('Error al obtener las empresas:', error.message);
            }
        },
        verProyectos(index) {
            console.log('Ver Proyectos', index);
        },
        editarEmpresa(index) {
            console.log('Editar Empresa', index);
        },
        actualizarEmpresa(index) {
            console.log('Actualizar Empresa', index);
        },
        agregarEmpresa() {
            console.log('Agregar Empresa');
        },
        obtenerToken() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        },
    },
    created() {
        this.cargarEmpresas();
    },
};
</script>
  
<style scoped>
.empresa-card {
    margin-bottom: 20px;
    background-color: transparent;
    /* Sin color de fondo */
    border: 2px solid #78D6C6;
    /* Borde con color */
    border-radius: 15px;
    /* Bordes redondeados */
}

.empresa-imagen {
    height: 300px;
    width: 300px;
    object-fit: cover;
    border-radius: 15px;
}

.empresa-nombre {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: black;
    /* Color negro */
}

.empresa-descripcion {
    margin-bottom: 10px;
    color: black;
    /* Color negro */
}

.ion-text-right {
    text-align: right;
}

.rounded-button {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #78D6C6;
}

.rounded-button ion-icon {
    font-size: 30px;
    color: #12486B;
}

.rounded-button:hover {
    color: #12486B;
}

.rounded-button ion-icon:hover {
    font-size: 30px;
    color: #78D6C6;
}
</style>
  