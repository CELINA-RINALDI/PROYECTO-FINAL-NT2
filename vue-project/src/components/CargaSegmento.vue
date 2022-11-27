<template>
    <div class="cargaSegmento">
        <nav>
        <router-link to="/home" class="boton mx-5"
            >Volver a Home</router-link>
        </nav>
        <h2>Cargar nuevo Segmento</h2>
        <form class="formulario">
        <p>Nombre del segmento: </p>
        <input type="text" name="title" v-model="input.nombre" placeholder="Segmento" />
        <br><br>
       <button v-on:click="validarDatos()">Cargar</button>
     </form>
    </div>
</template>

<script>
import { useStore } from '../store/store';
    export default {
        name: 'AddSegment',
        data() {
            return {
                input: {
                    userId: "", 
                    monto: 0, 
                    nombre: "",
                }
            }
        },
        setup() {
            const store = useStore();
           return { store };
        },
        methods: {
            async validarDatos() {
          if (this.input.nombre != '') {
            console.log(this.input.monto)
             this.store.actualizarSegmento(this.input); 
             this.$router.push('home') 
          } else {
            alert('Faltan campos por completar!');
          }
          },
        }
    }
</script>

<style scoped>

</style>