<template>
  <header><Menusss/></header>

  <Footer> <Pie_Pagina/></Footer>

</template>


<script>
// @ is an alias to /src
import Menusss from "@/components/Menu.vue";
import Pie_Pagina from "@/components/Pie_Pagina.vue";

export default {
  name: 'MenuView',
  components: {
    Menusss,
    Pie_Pagina
  }
}
</script>
