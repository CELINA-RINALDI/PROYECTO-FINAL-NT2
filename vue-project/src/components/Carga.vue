<template>
    <div class="carga">
        <nav>
        <router-link to="/home" class="btn btn-primary"
            >Volver a Home</router-link>
        </nav>
        <h2>Cargar nuevo item</h2>
        <form class="formulario">
        <p>Titulo: </p>
        <input type="text" name="title" class="form-control" v-model="input.title" placeholder="Titulo" />
        <br>
        <p>Descripcion: </p>
        <input type="text" name="description" class="form-control" v-model="input.description" placeholder="Descripcion" />
       <br>
       <p>Monto: </p>
        <input type="text" name="amount" class="form-control" v-model="input.amount" placeholder="Monto" />
       <br>
       <p>Tipo:</p>
       <input type="radio" id="gasto" name="tipo" value="gasto" v-model="input.esGasto">
       <label for="gasto">Gasto</label><br>
        <input type="radio" id="ingreso" name="tipo" value="ingreso" v-model="input.esGasto">
        <label for="ingreso">Ingreso</label><br>
       <label for="categoria">Segmento</label>
       <select name="categoria" id="categoria" class="form-control" v-model="input.categoria">
       <option value="Veterinaria">Veterinaria</option>
       <option value="Supermercado">Supermercado</option>
       <option value="Servicios">Servicios</option>
       <option value="Entretenimiento">Entretenimiento</option>
       <option value="Gastos imprevistos">Gastos imprevistos</option>
       <option value="Otros">Otros</option>
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
                    this.store.actualizarSegmento(this.input, 'a')
      
                } else {
                    this.input.esGasto = false;
                    console.log('me fui a ver si ahorro')
                    this.store.verificarAhorros(this.input);
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