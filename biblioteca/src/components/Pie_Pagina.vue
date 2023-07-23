<template>
  <div class="main-container">

    <footer style="background-color: #1A237E; color: #ffffff"> 
      @Wilder Rosas Flores
      <div>
        CopyRigth
      </div>
      <div>
        2023
      </div>
    </footer>
  </div>
</template>


<style>
/* Estilo del contenedor principal */
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 25vh; /* 100% del alto de la ventana del navegador */
}

/* Estilo del pie de página */
footer {
  padding-top: 20px;
  text-align: center;
  margin-top: 1.3%;
  min-height: 100px;
  width: 100%;
  margin-top: auto; /* Empuja el pie de página hacia la parte inferior */
}
</style>

<script>
export default {
  name: 'Footer',
  props: {

  }
}
</script>