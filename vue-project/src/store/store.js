import {defineStore} from 'pinia'; 

export const useStore = defineStore('nt2', {
    state: () => ({ appName: '',
    url: 'https://635735972712d01e1403e2b4.mockapi.io/',
    movimientos: [],
    usuarioValido: false,
    userName: '',
    users: [{
        name: 'Admin',
        mail: 'admin@a.com',
        password: 'admin', },
    {
        name: "Celi",
        mail: 'celi@a.com',
        password: 'celina',
    },
    {
        name: "Javier",
        mail: 'javier@a.com',
        password: 'javier',
    },],}),
     getters: {
        getMovimientos() {
            return this.movimientos;
        }
     }, 
     actions: {
        incrementar() {
           return (this.movimientos.length) + 1
        }, 
        async init() {
            this.cargarMovimientos();
        },
        async cargarMovimientos() {
            const response = await fetch(this.url + 'movements/')
            const results = await response.json()
            this.movimientos = results
        },
        validarUsuario(mail, contra) {
            let i = 0
            while (!this.usuarioValido && i < this.users.length) {
                if (mail == this.users[i].mail && contra == this.users[i].password) {
                    this.usuarioValido = true;
                    this.userName = this.users[i].name
                    console.log(this.userName)
                }
                i++
            }

            return this.usuarioValido;
        },
       async agregarMovimiento(mov) {       
        mov.amount = parseInt(mov.amount)
        let res = await fetch(this.url + 'movements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mov)
        });

        if (res.ok) {
          console.log('movimiento cargado!')
        } else {
            alert('error cargando el movimiento');
        }
    },
    async eliminarMovimiento(id) {
        let res = await fetch(this.url + 'movements/' + id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
          console.log('movimiento eliminado!')
        } else {
            alert('error eliminando el movimiento');
        }
    }
        }
     },
)