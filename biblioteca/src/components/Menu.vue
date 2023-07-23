<template>
    <div>
    <nav id="menu_color">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo"></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="left hide-on-med-and-down">
          <li><router-link to="/">HOME</router-link></li>
          <li><router-link to="/autor">AUTORES</router-link></li>
          <li><router-link to="/libro">LIBROS</router-link></li>
          <li><a href="/" class="brand-logo right"><img src="../assets/logo2.png" class="logo_cabecera"></a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">HOME</router-link></li>
      <li><router-link to="/autor">AUTORES</router-link></li>
      <li><router-link to="/libro">LIBROS</router-link></li>
    </ul>
    <routerView/>
  </div>
  </template>
  
  <style lang="scss">
  #app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  }

  #menu_color{
    background: #4A148C;
  }
  .logo_cabecera{
    width: 55px;
    height: 50px;
    margin-top: 5px;
  }
  </style>
  
<script>
export default {
  name: 'Menu',
  props: {

  }
}
</script>