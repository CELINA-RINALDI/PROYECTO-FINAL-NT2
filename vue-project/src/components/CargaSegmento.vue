<template>
    <div class="cargaSegemento">
        <nav>
        <router-link to="/home" class="btn btn-primary"
            >Volver a Home</router-link>
        </nav>
        <h2>Cargar nuevo segmento</h2>
        <form class="formulario">
        <p>Nombre del segmento: </p>
        <input type="text" name="title" class="form-control" v-model="input.nombre" placeholder="Segmento" />
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
            console.log(this.input)
             this.store.agregarSegmento(this.input); 
             this.$router.push('home') 
          } else {
            alert('Faltan campos por completar!');
          }
          },
        }
    }
</script>

<style scoped>
.carga {

}
 h2 {
    text-align: center;
}

form {
   margin: 0 auto;
   width: 300px;   
   background-color: white; 
   padding: 2px; 
   border-radius: 10px;
}

</style>