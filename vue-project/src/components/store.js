import {defineStore} from 'pinia'; 

export const useStore = defineStore('nt2', {
    state: () => ({contador:0, appName: ''}),
     getters: {
        total:(state) => state.contador,
     }, 
     actions: {
        incrementar() {
            this.contador++
        }, 
        async init() {
            /*const result = await fetch('')*/
        }
     },
})