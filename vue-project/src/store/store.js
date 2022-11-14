import {defineStore} from 'pinia'; 

export const useStore = defineStore('nt2', {
    state: () => ({ appName: '',
    url: 'https://635735972712d01e1403e2b4.mockapi.io/',
    movimientos: [],
    usuarioValido: false,
    usuarioActual: null,
    userName: '',
    saldo: 0,
    users: [{
        name: 'Admin',
        mail: 'admin@a.com',
        password: 'admin', 
     id: 1,},
    {
        name: "Celi",
        mail: 'celi@a.com',
        password: 'celina',
        id: 2,
    },
    {
        name: "Javier",
        mail: 'javier@a.com',
        password: 'javier',
        id:3,
    },],}),
     getters: {
        getMovimientos() {
            return this.movimientos;
        },
        getSaldo(){
            return this.saldo;
        }
     }, 
     actions: {
        incrementar() {
           return (this.movimientos.length) + 1
        }, 
        async init() {
           await this.cargarMovimientos();
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
                    this.userName = this.users[i].name;
                    this.usuarioActual = this.users[i];
                    console.log(this.userName)
                }
                i++
            }

            return this.usuarioValido;
        },
        actualizarSaldo(){
            this.saldo++
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
          console.log('movimiento cargado!');
          this.cargarMovimientos(); 
         /* this.actualizarSegmento(mov);  */
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
           let movimientosUpdated = this.movimientos.filter(mov => mov.id != id);
           this.movimientos = movimientosUpdated; 
        } else {
            alert('error eliminando el movimiento');
        }
    },
  /* async actualizarSegmento(mov){
          const response = await fetch(this.url + 'segments/')
           const results = await response.json()
            i = 0;
            encontrado = false;
           while(i < results.length && !encontrado) {
                if(results[i].userId == this.usuarioActual.id && results[i].nombre == mov.categoria) {
                    segAux = results[i]
                    segAux.monto = segAux.monto + mov.amount;
                    let res = await fetch(this.url + 'segments/' + results[i].id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(segAux)
                    });
            
                    if (res.ok) {
                      console.log('segmento actualizado!')
                    } else {
                        alert('error actualizando el segmento');
                    }
                } else {
                    i++;
                }
           }
       } */
        }
     },
)