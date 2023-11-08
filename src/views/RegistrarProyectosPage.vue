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
                                    <ion-select-option v-for="item in empresas" :key="item" :value="item">{{ item
                                    }}</ion-select-option>
                                </ion-select>
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
            empresas: [
                "Empresa 1",
                "Empresa 2",
                // Agrega más opciones según las empresas disponibles
            ],
        };
    },
    methods: {
        registrarProyecto() {
            swal("Registro Exitoso", "Proyecto registrado correctamente", "success")
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

/* Cambia el color del texto de los elementos ion-select-option a negro */

</style>
  