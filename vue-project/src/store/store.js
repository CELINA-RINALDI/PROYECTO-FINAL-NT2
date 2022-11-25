import {defineStore} from 'pinia'; 

export const useStore = defineStore('nt2', {
    state: () => ({ appName: '',
    url: 'https://635735972712d01e1403e2b4.mockapi.io/',
    movimientos: [],
    segmentos: [],
    usuarioValido: false,
    usuarioActual: null,
    userName: '',
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
        async cargarSegmentos() {
            const response = await fetch(this.url + 'segment/')
            const results = await response.json()
            this.segmentos = results
            console.log(results)
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
          console.log(this.movimientos.find(mov => mov.id == id))
          this.actualizarSegmento(this.movimientos.find(mov => mov.id == id))
          console.log(this.movimientos.find(mov => mov.id == id))
           let movimientosUpdated = this.movimientos.filter(mov => mov.id != id);
           this.movimientos = movimientosUpdated; 
        } else {
            alert('error eliminando el movimiento');
        }
    },
   async actualizarSegmento(mov){
          const response = await fetch(this.url + 'segment/')
           const results = await response.json()
            let i = 0;
            let encontrado = false;
           while(i < results.length && !encontrado) {
            console.log(results[i].nombre , mov.categoria)
                if(results[i].userId == this.usuarioActual.id && results[i].nombre == mov.categoria) {
                    encontrado = true;
                    let segAux = results[i]
                    if(mov.esGasto) {
                    segAux.monto = segAux.monto - mov.amount;
                    } else {
                    segAux.monto = segAux.monto + mov.amount;
                    }
                    let res = await fetch(this.url + 'segment/' + results[i].id, {
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
       } 
        }
     },
)