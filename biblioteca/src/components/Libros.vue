<template>
    <div>
        <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3"><a href="#listar">LIBROS</a></li>
        <li class="tab col s3"><a href="#nuevo">NUEVO</a></li>
      </ul>
    </div>
    <div id="listar" class="col s12"><slot name="lista"></slot></div>
    <div id="nuevo" class="col s12"><slot name="nuevo"></slot></div>
  </div>
        
    </div>
</template>

<style scoped lang="scss"> 


</style>

<script>
export default {
    name: "tabla",
    created(){
        setTimeout(()=>{
            var elems = document.querySelectorAll('.tabs');
        var tabs =M.Tabs.init(elems);
        });
    }
}

</script>