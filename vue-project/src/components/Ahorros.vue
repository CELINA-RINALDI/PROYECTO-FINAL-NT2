
<template>
    <div class="ahorros">
        <canvas id="grafica"></canvas>
    <router-link to="/home" class="btn btn-primary"
            >Volver</router-link>
            <h3>Tus ahorros en lo que va del año:</h3>
            <div class="container">
<div class="ahorro"
   v-for="{id, amount, month, userId } in this.ahorros"
                :key="id"
                :id="id"
                :amount="amount"
                :month="month"
                :userId="userId">
                <div class="card ">
                 <div class="card-body">
                <h5 class="card-title">{{getNombreMes(month)}}</h5>
                <h5 class="card-title">{{'$'+amount}}</h5>
            </div>
</div> 
</div>
</div>
        </div>
        
</template>

<script>
import { useStore } from '../store/store';
export default {
    name: 'Ahorros',
    data() {
         return {
            ahorros : []
         }
        },
        setup() {
            const store = useStore();
           return { store };
        },
        created() {
           this.cargarAhorros();
        },
        methods: {
            async cargarAhorros() {
                var todosAhorros = await this.store.getAhorros();
                var auxAhorros = [];
                var today = new Date();
                console.log(today);
                var month = today.getMonth() + 1;
                console.log(month)
                for (let i = 0; i < month; i++) {
                    auxAhorros.push(todosAhorros[i])        
                }
                this.ahorros = auxAhorros;
            },
            getNombreMes(numero) {
            let nombre = ''; 
            switch (numero) {
                case 1:
                    nombre = 'Enero';
                    break;
                    case 2:
                    nombre = 'Febrero';
                    break;   
                     case 3:
                     nombre =  'Marzo';
                    break;  
                    case 4:
                    nombre =  'Abril';
                    break;    
                    case 5:
                    nombre =  'Mayo';
                    break; 
                     case 6:
                     nombre =  'Junio';
                    break;   
                     case 7:
                     nombre =  'Julio';
                    break;   
                     case 8:
                     nombre =  'Agosto';
                    break;  
                    case 9:
                    nombre =  'Septiembre';
                    break;  
                      case 10:
                      nombre =  'Octubre';
                    break;   
                     case 11:
                     nombre = 'Noviembre';
                    break;   
                     case 12:
                     nombre =  'Diciembre';
                    break;
                default:
                    break;
            }
            return nombre;
            }
        },
}
</script>

<style scoped>
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
</style>