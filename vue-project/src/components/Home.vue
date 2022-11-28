<template>
<div>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> 
<nav class="navbar navbar-inverse navbar-expand-md" id="nav">
  <ul class="nav navbar-nav mr-auto" id="nav">
    <li> <router-link to="/carga">Carga</router-link
          ></li>
    <li><router-link to="/Segmentos">Segmentos</router-link
          ></li>
          <li><router-link to="/ahorros">Ahorros</router-link
          ></li>
          <li><router-link to="/">Log out</router-link
          ></li>
  </ul>

  <div class="navright">

  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <div class="navtext">Bienvenido: <br>{{store.userName}}</div>
    </li>
  </ul>
  </div>
  </nav>
  <div class="movimientos">
            <Movimientos
                :movimientos="movimientos"
            />
  </div>
  </div>
</template> 
<script>
import { useStore } from  '../store/store';
import Movimientos from "./movements/Index.vue";
export default {
  components: {
        Movimientos,
    },
    data() {
      return {
      movimientos: [],
    };
    },
    created() {
    this.movimientos = this.store.movimientos;
    },
  name: "Home",
  setup() {
   const store = useStore();
   return {store}
  },
};
</script>

<style>
.boton {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: white;
  border: 5px solid black;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.movimientos {
  height: 100px;
}
#nav {
   width: 100%;
}
.navtext{
  color: white;
}
.navright{
  justify-content: start;
  padding-right: 3%;
}
</style>

