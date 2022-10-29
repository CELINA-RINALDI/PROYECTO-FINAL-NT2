<template>
    <div id="login">
        <div>Ingresa a tu cuenta</div>
        <router-link to="/" class="boton mx-5"
            >Volver al inicio</router-link>
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button v-on:click="validarLogin" type="submit" class="btn btn-primary">Enviar</button>
    </div>
</template>
<script>
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
        methods: {
            validarLogin() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.input.password) {
                        this.$router.replace('home');
                    }
                  /*  if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    } */
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 100%;
        border: 1px solid #000000;
        background-color: #FFFFFF;
        color: black;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>