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

<script setup>
import { toRefs, defineProps, computed } from 'vue';
import Movimiento from "./Movimiento.vue";
import { useStore } from "../../store/store";
const props = defineProps({
    movimientos: {
        type: Array,
        default: () => [],
    },
});
/*const { movimientos } = toRefs(props);*/
 const store = useStore();
const remove = async (id) => {
   await store.eliminarMovimiento(id);
}
const totalGastos = computed(() => {
  const gastos = store.movimientos.filter(mov => mov.esGasto);
  return gastos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
})
const totalIngresos = computed(() => {
  const gastos = store.movimientos.filter(mov => !mov.esGasto);
  return gastos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
})
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