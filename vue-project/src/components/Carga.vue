<template>
    <div>Bienvenido a la vista de carga
        <router-link to="/home" class="boton mx-5"
            >Volver a Home</router-link>
        <p>Monto: </p>
        <input type="text" name="Saldo" placeholder="Saldo" />
       <br>
        <button @click="store.actualizarSaldo()">Cargar Saldo</button>

    </div>
</template>
<script>
import { useStore } from  '../store/store';

export default ({
    setup() {
   const store = useStore();
   return {store}
  },
  async created(){
    await this.store.init()
  }
})
</script>
