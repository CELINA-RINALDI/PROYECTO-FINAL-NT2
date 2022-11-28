<template>
    <div id="movimiento" :class="{
                'lightyellow': esAhorro&&!esGasto,
                'darkyellow': esAhorro&&esGasto,
                'red': !esAhorro&&esGasto,
                'green': !esAhorro&&!esGasto,
            }">
        <div class="content">
            <h4>{{ title }}</h4>
            <p>{{ description }}</p>
        </div>
        <div class="action">
            <img src="@/assets/trash-icon.png" class= "iconoBorrar" alt="borrar" @click="remove" />
            <p>{{ amountCurrency }}</p>
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits, computed } from 'vue';
const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});
const props = defineProps({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    esGasto: {
        type: Boolean,
    },
    esAhorro: {
        type: Boolean,
    },
    categoria: {
        type: String,
    }, 
    userId: {
        type: Number, 
    }
});
const { id, title, description, amount, esGasto,esAhorro, categoria, userId} = toRefs(props);
const amountCurrency = computed(
    () => currencyFormatter.format(amount.value)
);
const emit = defineEmits(["remove"]);
const remove = () => {
    emit("remove", id.value);
}
</script>

<style scoped>
.iconoBorrar {
    width: 20px;
    height: 20px;
}
#movimiento {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  opacity: 0.7;
    color: black;
}
#movimiento .content {
  width: 100%;
}
#movimiento .action {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}
h4,
p {
  margin: 0;
  padding: 0;
}
h4 {
  margin-bottom: 8px;
}
.movement .action img {
  margin-bottom: 16px;
}

.red {
    background-color: #CD5C5C;
}
.green {
    background-color: #cfefd5;
}
</style>