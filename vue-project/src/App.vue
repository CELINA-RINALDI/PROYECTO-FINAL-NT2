<template>
 <div id="app">
  <div>Bienvenido</div>
   <br> 
    <nav class="navbar fixed-top" style="background-color: #ffeee4">
       <router-link to="/UserLogin" class="navbar-brand"
            >Login</router-link>
    </nav>
   <router-view></router-view>
  </div>
</template>
<script>
import { useStore } from './components/store';

export default {
  name: 'App',
  setup() {
    // dejamos disponible el store
    const store = useStore();
    return {store};
  },
 /* async created() {
    await this.store.init(); 
  } */
};
</script>

<style>

</style>