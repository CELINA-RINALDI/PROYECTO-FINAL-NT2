<template>
<div>
    <div class="display justify-content-center">
      <div class="p-3 mb-4">
        <div class="col text-center">
          <router-link to="/carga" class="boton mx-5"
            >Carga</router-link
          >
          <router-link to="/Segmentos" class="boton mx-5"
            >Segmentos</router-link
          >
          <router-link to="/" class="boton mx-5"
            >Log out</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.boton {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  background-color: rgb(165, 247, 165);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 5px solid #ede3fc;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>

