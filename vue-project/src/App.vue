
<template>
 <div id="app">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
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
    /* if(this.store.validarUsuario("admin@a.com", "admin")) {
     await this.store.init(); 
    } */
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