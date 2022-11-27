<template>
    <div class="segmentos">
        <router-link to="/home" class="boton btn btn-primary"
            >Volver a Home</router-link>
            <router-link to="/cargaSegmento" class="boton btn btn-primary"
            >Agregar Segmento</router-link>
<h1>Tus gastos segmentados:</h1>
<div class="container">
<div class="segmento"
   v-for="{id, monto, nombre, userId } in this.store.segmentos"
                :key="id"
                :id="id"
                :monto="monto"
                :nombre="nombre"
                :userId="userId">
                 <div v-if="esUsuario(userId)" class="card" style="width: 18rem;">
                 <img class="card-img-top" v-bind:src="buscarImagen(nombre)" alt="Card image cap">
                 <div class="card-body">
                <h5 class="card-title">{{nombre}}</h5>
                <h5 class="card-title">{{'$'+monto}}</h5>
  </div>
</div> 
</div>
<div class="segmento">
                <h5>{{nombre}}</h5>

  </div>
</div>
</div>
</template>
<script>
import { useStore } from '../store/store';
    export default {
        name: 'Segmentos',
        data() {
         return {
            segmentos : []
         }
        },
        setup() {
            const store = useStore();
           return { store };
        },
        mounted() {
          this.cargarSegmentos();
        },
        methods: {
          async cargarSegmentos() {
            await this.store.cargarSegmentos();
            this.segmentos = this.store.segmentos; 
          },
          esUsuario(userId) {
            return userId == this.store.usuarioActual.id;
          },
          buscarImagen(nombreCat) {
            let url = 'https://cdn-icons-png.flaticon.com/512/4564/4564330.png';
            switch (nombreCat) {
               case 'Veterinaria':
                  url = 'https://thumbs.dreamstime.com/b/caricatura-fluido-intravenoso-icono-emoji-aislado-vector-170763536.jpg';
                  break;
                case 'Servicios': 
                url = 'https://thumbs.dreamstime.com/b/pago-de-impuestos-icono-declaraci%C3%B3n-d%C3%B3lar-estadounidense-ilustraci%C3%B3n-del-vector-devoluci%C3%B3n-168358476.jpg';
                   break;
                   case 'Entretenimiento': 
                   url = 'https://cdn-icons-png.flaticon.com/512/4221/4221836.png';
                   break;
                   case 'Supermercado': 
                   url = 'https://cdn-icons-png.flaticon.com/512/3082/3082031.png';
                   break;
                   case 'Gastos imprevistos': 
                   url = 'https://thumbs.dreamstime.com/b/desgarrado-bolsa-de-dinero-l%C3%ADnea-color-icono-firmar-para-aplicaci%C3%B3n-m%C3%B3vil-p%C3%A1gina-web-signo-bot%C3%B3n-logo-210010731.jpg';
                   break;
               default:
                  break;
            }
            return url; 
          }
        }
    }
</script>

<style>
.container {
   display:flex;
   max-width:900px;
   max-height: 900px;
   margin:0 auto;
   padding:0 20px;
   justify-content:space-between;
   flex-wrap:wrap;
}
@media screen and (max-width:768px) {
   .container {
        flex-direction: column;
    }
}
@media screen and (max-width:480px) {
   .container {
        flex-direction: column;
    }
}
.card-title {
   font-weight:bold; 
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: var(--max);
  text-align: center;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
img {
width: 100%;
max-width: var(--max);
height: calc(var(--max));
object-fit: cover;
} 
* {
box-sizing: border-box
}

:root {
--max: 18rem
}

body {
margin: 0;
padding: 0;
min-height: 100%
}
</style>