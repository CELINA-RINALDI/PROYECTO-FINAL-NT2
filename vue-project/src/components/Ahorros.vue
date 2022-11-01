<template>
<div>
  <form id="search" v-on:submit.prevent>
    Busqueda: <input name="query" v-model="searchQuery">
  </form>
  <Tabla
    :data="gridData"
    :columns="gridColumns"
    :columnsText="columnsHeader"
    :filter-key="searchQuery">
  </Tabla>
</div>
</template>

<script>
import Tabla from './Tabla.vue'
export default {
  name: 'Ahorros',
  components: {
    Tabla
  },
  data() {
    //Simular peticion BackEnd
    return {
        searchQuery: '',
        gridColumns: ['description', 'amount', 'createdAt'],
        columnsHeader: ['Descripcion del ahorro', 'Monto ahorrado', 'Fecha de carga'],
        gridData: [
            {"createdAt":"2022-10-31T05:32:01.851Z","userid":19,"amount":19,"description":"description 1","id":"1"},
            {"createdAt":"2022-10-31T03:50:27.753Z","userid":41,"amount":70,"description":"description 2","id":"2"},
            {"createdAt":"2022-10-31T16:23:23.314Z","userid":33,"amount":55,"description":"description 3","id":"3"},
            {"createdAt":"2022-10-31T22:14:05.044Z","userid":35,"amount":31,"description":"description 4","id":"4"},
            {"createdAt":"2022-10-31T05:02:10.448Z","userid":44,"amount":3,"description":"description 5","id":"5"},
            {"createdAt":"2022-10-31T15:22:15.670Z","userid":0,"amount":80,"description":"description 6","id":"6"},
            {"createdAt":"2022-10-31T13:58:13.848Z","userid":77,"amount":92,"description":"description 7","id":"7"},
            {"createdAt":"2022-10-31T07:08:31.639Z","userid":68,"amount":23,"description":"description 8","id":"8"},
            {"createdAt":"2022-10-31T01:38:06.108Z","userid":49,"amount":30,"description":"description 9","id":"9"},
            {"createdAt":"2022-10-31T22:49:01.249Z","userid":53,"amount":1,"description":"description 10","id":"10"}
        ],
    }
  },
}
</script>