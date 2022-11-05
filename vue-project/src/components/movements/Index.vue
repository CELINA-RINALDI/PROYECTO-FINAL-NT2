<template>
    <div class="movements">
        <h2 class="title">Historial</h2>
        <div class="content">
            <Movimiento
                v-for="{ id, title, description, amount, esGasto } in movimientos"
                :key="id"
                :id="id"
                :title="title"
                :description="description"
                :amount="amount"
                :esGasto="esGasto"
                @remove="remove"
            />
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue';
import Movimiento from "./Movimiento.vue";
const props = defineProps({
    movimientos: {
        type: Array,
        default: () => [],
    },
});
const { movimientos } = toRefs(props);
const remove = (id) => {
    console.log("remove", id);
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
</style>