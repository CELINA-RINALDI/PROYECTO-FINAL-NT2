<template>
<div>
  <table class="table">
    <thead>
      <tr>
        <th v-for="key in columnsText"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
          :key="key">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody class="content">
      <tr v-for="entry in filteredData" :key="entry.id">
        <td v-for="key in columns" :key="key" >
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="sum">
    <br>Total de Ahorros: {{
    filteredData.reduce((acc, obj)=> {
      return acc + obj.amount;
    },0 )
  }}
  </div>
</div>
</template>

<style scoped>
#table {
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
#table .content {
  width: 100%;
}
#table .td{
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 8px;
}
.sum {
  margin: 8px 16px 24px 16px;
  color: var(--brand-blue);
}
</style>

<script>
export default {
  name: 'Tabla',
  props: {
    data: Array,
    columns: Array,
    columnsText: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>