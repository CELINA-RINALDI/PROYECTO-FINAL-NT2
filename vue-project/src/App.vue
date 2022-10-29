<template>
 <div id="app">
  <div>Bienvenido</div>
    <nav class="navbar fixed-top" style="background-color: #ffeee4">
        <div class="d-flex">
       <router-link to="/UserLogin" class="navbar-brand"
            >Login</router-link>
        </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style>
.app {
padding: top;
}
.iconoBoton {
  width: 50px;
  height: 50px;
}
</style>