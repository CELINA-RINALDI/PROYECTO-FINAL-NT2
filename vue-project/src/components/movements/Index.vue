<template>
    <div class="movements">
        <h2 class="title">Historial</h2>
        <h3 class="saldo">Tu saldo: ${{ totalIngresos - totalGastos }}</h3>
        <div class="content">
            <Movimiento
                v-for="{ id, title, description, amount, esGasto, categoria } in store.movimientos"
                :key="id"
                :id="id"
                :title="title"
                :description="description"
                :amount="amount"
                :esGasto="esGasto"
                @remove="remove"
                :categoria="categoria"
            />
        </div>
    </div>
</template>
<script>
import { useStore } from  '../../store/store';
import Movimiento from "../movements/Movimiento.vue";
export default {
  name: "Index",
    components: {
        Movimiento,
    },
    data() {
      return {
      movimientos: [],
      saldoActual: 0,
    };
    },
    created() {
    this.movimientos = this.store.movimientos;
    this.store.cargarSaldoActual(this.totalIngresos - this.totalGastos);
    this.saldoActual =  this.store.saldoActual; 
    },
  setup() {
   const store = useStore();
   return {store}
  },
  computed: {
    saldoActualizado() {
     this.store.cargarSaldoActual(this.totalIngresos - this.totalGastos);
      this.saldoActual = totalIngresos - totalGastos;
     return this.totalIngresos - this.totalGastos
    },
    totalGastos() {
    const gastos = this.store.movimientos.filter(mov => mov.esGasto);
     return gastos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
    );
   },
   totalIngresos(){
  const gastos = this.store.movimientos.filter(mov => !mov.esGasto);
  return gastos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
  }, 
  },
  methods: {
    async remove(id){
      await this.store.eliminarMovimiento(id);
    },
}
}

</script>

<style scoped>
.movements {
  max-height: 100%;
  width: 100%;
  padding: 0 8px;
  margin-bottom: 14px;
}
.title {
  margin: 8px 16px 24px 16px;
  color: var(--brand-blue);
}
.content {
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
}
.saldo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>