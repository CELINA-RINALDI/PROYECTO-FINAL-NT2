<template>
    <div class="segmentos">
        <router-link to="/home" class="boton mx-5"
            >Volver a Home</router-link>
            <router-link to="/cargaSegmento" class="boton mx-5"
            >Cargar Segmento</router-link>
    <div class="container">
   <div class="flex-box" id="uno">Veterinaria</div>
      <div class="flex-box" id="dos">Supermercado</div>
   <div class="flex-box" id="tres">Servicios</div>
   <div class="flex-box" id="cuatro">Entretenimiento</div>
   <div class="flex-box" id="cinco">Gastos imprevistos</div>
   <div class="flex-box" id="seis">Otros</div>
</div>
</div>
</template>

<style>
.flex-box {
   width:calc(33.333% - 20px);
   height:100px;
   background:grey;
   margin-bottom:10px;
   margin-top:10px;
   font-size: medium;
   font-weight: bold;
   color: black;
}
.container {
   display:flex;
   max-width:900px;
   margin:0 auto;
   padding:0 20px;
   justify-content:space-between;
   flex-wrap:wrap;
   border:2px solid black;
}
@media screen and (max-width:768px) {
   .flex-box {
      width:calc(50% - 10px);
   }
}
@media screen and (max-width:480px) {
   .flex-box {
      width:100%;
   }
}
#uno {
background-color: red;
}
#dos {
background-color: pink;
}
#tres {
background-color: blue;
}
#cuatro {
background-color: green;
}
#cinco {
background-color: yellowgreen;
}
#seis {
background-color: lightblue;
}
</style>