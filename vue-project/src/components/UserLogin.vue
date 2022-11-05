<template>
    <div id="login">
        <div>Ingresa a tu cuenta</div>
        <router-link to="/" class="boton mx-5"
            >Volver al inicio</router-link>
        <h1>Login</h1>
        <p>Usuario: </p>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <br>
        <p>Contraseña: </p>
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
       <br>
        <button v-on:click="validarLogin" type="submit" class="btn btn-primary">Enviar</button>
    </div>
</template>
<script>
import { useStore } from '../store/store';
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        setup() {
            const store = useStore();
           return { store };
        },
        methods: {
            validarLogin() {
          if (this.store.validarUsuario(this.input.username, this.input.password)) {
            console.log(this.input.username)
          this.$router.push('home') 
          }
          },
        }
    }
</script>

<style scoped>
    #login {
        width: 100%;
        height: 100%;
        border: 1px solid #000000;
        background-color: #dff7d5;
        color: black;
       margin: auto;
        margin-top: 200px; 
       padding: 20px; 
    } 
</style>