<template>
 <div id="app">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
   <br> 
    <nav class="navbar fixed-top" style="background-color: #ffeee4">
       <router-link to="/UserLogin" class="navbar-brand"
            >Login</router-link>
    </nav>
   <router-view></router-view>
  </div>
</template>
<script>
import { useStore } from './store/store';

export default {
  name: 'App',
  setup() {
    // dejamos disponible el store
    const store = useStore();
    return {store};
  },
  async created() {
    if(this.store.validarUsuario("admin@a.com", "admin")) {
     this.store.init(); 
    }
  } 
};
</script>

<style>
#app {
  padding-top: 4.5rem;
  width: 100%;
}
.header {
  background-color: #ffeee4;
}
</style>