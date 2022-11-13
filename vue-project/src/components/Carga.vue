<template>
    <div class="carga">
        <nav>
        <router-link to="/home" class="boton mx-5"
            >Volver a Home</router-link>
        </nav>
        <h2>Cargar nuevo item</h2>
        <form class="formulario">
        <p>Titulo: </p>
        <input type="text" name="title" v-model="input.title" placeholder="Titulo" />
        <br>
        <p>Descripcion: </p>
        <input type="text" name="description" v-model="input.description" placeholder="Descripcion" />
       <br>
       <p>Monto: </p>
        <input type="text" name="amount" v-model="input.amount" placeholder="Monto" />
       <br>
       <p>Tipo:</p>
       <input type="radio" id="gasto" name="tipo" value="gasto" v-model="input.esGasto">
       <label for="gasto">Gasto</label><br>
        <input type="radio" id="ingreso" name="tipo" value="ingreso" v-model="input.esGasto">
        <label for="ingreso">Ingreso</label><br>
       <label for="categoria">Categoria</label>
       <select name="categoria" id="categoria" v-model="input.categoria">
       <option value="veterinaria">Veterinaria</option>
       <option value="supermercado">Supermercado</option>
       <option value="servicios">Servicios</option>
       <option value="entretenimiento">Entretenimiento</option>
       <option value="gastosImprevistos">Gastos imprevistos</option>
       <option value="otros">Otros</option>
       </select>
       <br><br>
       <button v-on:click="validarDatos()">Agregar</button>
     </form>
    </div>
</template>

<script>
import { useStore } from '../store/store';
    export default {
        name: 'AddMovement',
        data() {
            return {
                input: {
                    title: "",
                    description: "",
                    amount: 0, 
                    esGasto: null,
                    categoria: "",
                }
            }
        },
        setup() {
            const store = useStore();
           return { store };
        },
        methods: {
            async validarDatos() {
          if (this.input.title != '' && this.input.amount != '') {
            console.log(this.input.categoria)
            let elementoActivo = document.querySelector('input[name="tipo"]:checked');
            if(elementoActivo) {
                if(elementoActivo.value == 'gasto') {
                    this.input.esGasto = true;
      
                } else {
                    this.input.esGasto = false;
                }
            } else {
                alert('Faltan campos por completar!');
            }
            console.log(this.input)
             this.store.agregarMovimiento(this.input); 
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