import {defineStore} from 'pinia'; 

export const useStore = defineStore('nt2', {
    state: () => ({ appName: '',
    url: 'https://635735972712d01e1403e2b4.mockapi.io/',
    movimientos: [],
    segmentos: [],
    ahorros: [],
    usuarioValido: false,
    usuarioActual: null,
    userName: '',
    saldoActual: 0, 
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
     computed() {
     },
     actions: {
        incrementar() {
           return (this.movimientos.length) + 1
        }, 
        getSaldoActual() {
            return this.saldoActual; 
        },
        cargarSaldoActual(monto){
            this.saldoActual = monto; 
           console.log(this.saldoActual);
           return this.saldoActual; 
        },
        async init() {
           await this.cargarMovimientos();
           await this.getAhorros();
           await this.cargarAhorrosPorMovimientos();
        },
        async cargarMovimientos() {
            const response = await fetch(this.url + 'movements/')
            const results = await response.json()
            let movUser = results.filter(mov => mov.userId == this.usuarioActual.id)
            this.movimientos = movUser;
        },
        async getAhorros() {
            const response = await fetch(this.url + 'saving/')
            const results = await response.json()
            console.log(results)
            let aux = results.filter(item => item.userid == this.usuarioActual.id)
            console.log(aux);
            this.ahorros = aux; 
            return aux;
        },
        async cargarAhorrosPorMovimientos(){
            const movsAhorro = this.movimientos.filter(mov => mov.esAhorro && new Date(mov.createdAt).getYear() == new Date().getYear())
            let mesAhorro;
            if(Array.isArray(this.ahorros) && this.ahorros.length > 0){
                mesAhorro = [...this.ahorros].map((mov)=>{
                    let m = mov
                    m.amount = 0
                    return m
                })
            }else{
                mesAhorro = [ ...Array(12).keys() ].map((_, index) => ({"userid":this.usuarioActual.id,"amount":0,"month":index+1}))
            }
            movsAhorro.forEach(mov => {
                mesAhorro[new Date(mov.createdAt).getMonth()].amount += mov.amount
            });
            this.ahorros = mesAhorro
        },
        async cargarSegmentos() {
            const response = await fetch(this.url + 'segment/')
            const results = await response.json()
            this.segmentos = results
            console.log(results)
        },
        async validarUsuario(mail, contra) {
            let i = 0
            console.log('vine a validar al metodo validarUsuario')
            console.log(mail + "||"+contra)
            while (!this.usuarioValido && i < this.users.length) {
                console.log(this.users[i].mail+"||"+this.users[i].password)
                if (mail == this.users[i].mail && contra == this.users[i].password) {
                    this.usuarioValido = true;
                    this.userName = this.users[i].name;
                    this.usuarioActual = this.users[i];
                    console.log(this.userName)
                }
                i++
            }

            return await this.usuarioValido;
        },
        async agregarMovimiento(mov) {       
            mov.amount = parseInt(mov.amount)
            mov.userId = this.usuarioActual.id;
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
            let mov = this.movimientos.find(mov => mov.id == id);
            if(mov.esGasto) {
            this.actualizarSegmento(this.movimientos.find(mov => mov.id == id), 'b')
            }
            let movimientosUpdated = this.movimientos.filter(mov => mov.id != id);
            this.movimientos = movimientosUpdated; 
            } else {
                alert('error eliminando el movimiento');
            }
        },
        async actualizarAhorro(monto) {
            let mesActual = new Date().getMonth() + 1;
            console.log("mes actual " + mesActual)
            console.log("ahorros: " + this.ahorros.toString())
            console.log("user actual " + this.usuarioActual.toString())
            let ahorroBuscado = this.ahorros.find(ahorro => ahorro.userid == this.usuarioActual.id && ahorro.month == mesActual)
            console.log("ahorroBuscado" + ahorroBuscado.toString())
            ahorroBuscado.amount = ahorroBuscado.amount + this.saldoActual;
            let res = await fetch(this.url + 'saving/' + ahorroBuscado.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ahorroBuscado)
            });

            if (res.ok) {
            console.log('ahorro actualizado!')
            this.eliminarMovimientosAnteriores(); 
            } else {
                alert('No se encontró el mes para ahorrar');
            }
        },
        async eliminarMovimientosAnteriores() {      /* BORRA TODOS LOS ELEMENTOS para luego agregar el entrante*/ 
        console.log('length de movimientos = ' + this.movimientos.length); 
        let cantMovs = this.movimientos.length;

            for (let i = 0; i < cantMovs; i++) {
                console.log(this.movimientos[0].title);
            await this.eliminarMovimiento(this.movimientos[0].id); 
                console.log(i); 
            }
        },
        async alertaAhorro(monto)
        {
        var opcion = confirm("Notamos que ingresaste un monto grande. ¿Querés mover lo que te sobró del ciclo anterior a ahorros?");
        if (opcion == true) {
            this.actualizarAhorro(monto)
        }
        },
        async verificarAhorros(mov){
            console.log('veo monto');
            if(mov.amount >= 100.000) {
                console.log('deberia tirar alerta ahorro')
                this.alertaAhorro(mov.monto);
            }
        },
        async cargarAhorro(mov) {
            let mesActual = new Date().getMonth() + 1;
            console.log("mes actual " + mesActual)
            console.log("ahorros: " + this.ahorros.toString())
            console.log("user actual " + this.usuarioActual.toString())
            const movIn = mov
            const movOut = mov
            movOut.esGasto = true
            movOut.descripcion = movOut.description + "(Egreso a Ahorros)"
            movIn.esGasto = false
            movIn.descripcion = movIn.description + "(Ingreso a Ahorros)"
            agregarMovimiento(movIn)
            agregarMovimiento(movOut)
            let ahorroBuscado = this.ahorros.find(ahorro => ahorro.userid == this.usuarioActual.id && ahorro.month == mesActual)
            ahorroBuscado.amount = ahorroBuscado.amount + movIn.amount;
            let res = await fetch(this.url + 'saving/' + ahorroBuscado.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ahorroBuscado)
            });
            if (res.ok) {
                console.log('ahorro actualizado!')
                
            } else {
                alert('No se encontró el mes para ahorrar');
            }
        },
        async actualizarSegmento(mov, tipo){           /* TIPO ES 'A' SI ES PARA AGREGAR O 'B' SI ES PARA BORRAR */
            const response = await fetch(this.url + 'segment/')
            const results = await response.json()
                let i = 0;
                let encontrado = false;
            while(i < results.length && !encontrado) {
                console.log(results[i].nombre , mov.categoria)
                    if(results[i].userId == this.usuarioActual.id && results[i].nombre == mov.categoria) {
                        encontrado = true;
                        let segAux = results[i]
                        if(tipo == 'b') {
                        segAux.monto = segAux.monto - mov.amount;
                        } else {//A
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