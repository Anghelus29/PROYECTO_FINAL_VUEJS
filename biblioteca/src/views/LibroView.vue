<template>
    <div>
      <Library>
        <template v-slot:lista>
          <table class="highlight responsive-table">
            <thead>
              <tr>
                <th>TITULO</th>
                <th>AUTOR</th>
                <th>AÑO DE PUBLICACION</th>
                <th>GENERO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='item in items' :key="item.id">
                <td>{{ item.titulo }}</td>
                <td>{{ getAutorName(item.autor_id) }}</td>
                <td>{{ item.anio_publicacion }}</td>
                <td>{{ item.genero  }}</td>
                <td><button class="waves-effect waves-light btn red lighten-2" @click="eliminarLibro(item.id)">
                <i class="material-icons left">delete</i>Eliminar
              </button></td>

              <td>
                <button class="waves-effect waves-light btn blue" @click="editarModal(item)">
              <i class="material-icons left">edit</i>Editar
            </button>
          </td>
              </tr>
            </tbody>
          </table>

          <div id="editarModal" class="modal">
      <div class="modal-content">
        <h4>Editar Libro</h4>
        <form @submit.prevent="actualizarLibro">
          <label>Título</label>
          <input v-model="libroEditado.titulo" type="text" required>

          <label>Autor</label>
          <select v-model="nuevoLibro.autor_id" required>
        <option value="" disabled>ELIJA UN AUTOR</option>
        <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nombre }}</option>
      </select>

          <label>Año de Publicación</label>
          <input v-model="libroEditado.anio_publicacion" type="date" required>

          <label>Género</label>
          <input v-model="libroEditado.genero" type="text" required>

          <button type="submit" class="btn blue">
          <i class="material-icons left">save</i> Guardar
        </button>
        <button type="button" class="btn red lighten-1" @click="cancelarEdicion">
          <i class="material-icons left">cancel</i> Cancelar
        </button>
        </form>
      </div>
    </div>
        </template>
        <template v-slot:nuevo>
          <form @submit.prevent="crearLibro">
          <label>Título</label>
          <input v-model="nuevoLibro.titulo" type="text" required>

          <label>Autor</label>
          <select v-model="nuevoLibro.autor_id" required>
        <option value="" disabled>ELIJA UN AUTOR</option>
        <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nombre }}</option>
      </select>
            <div></div>
        
            <label>Año de Publicación</label>
      <input v-model="nuevoLibro.anio_publicacion" type="date" required>

          <label>Género</label>
          <input v-model="nuevoLibro.genero" type="text" required>

          <div v-if="mostrarMensaje" class="mensaje-creacion">
      {{ mensajeCreacion }}
    </div>

          <button type="submit">Guardar</button>
        </form>
        </template>
      </Library>
      
    </div>
  </template>
  

  <script>
  import Library from '@/components/Libros.vue'
  import axios from 'axios';
  
  export default {
  name: 'BibliotecaView',
  data() {
    const api = 'http://localhost:3000';
    return {
      api,
      jsonData: null,
      items: [],
      autores: [],
      nuevoLibro: {
        titulo: '',
        autor_id: null,
        anio_publicacion: null,
        genero: ''
      },
      mensajeCreacion: '',
    mostrarMensaje: false,

    libroEditado: {
        id: null,
        titulo: "",
        autor_id: null,
        anio_publicacion: null,
        genero: "",
      },
    };
  },

  computed: {
    getAutorName() {
      return (autorId) => {
        const autor = this.autores.find((autor) => autor.id === autorId);
        console.log(autor? autor.nombre:'');
        return autor ? autor.nombre : 'Autor desconocido';
      };
    },
  },
  methods: {
    getItems() {

axios
  .get(this.api + '/libros')
  .then((res) => {
    this.items = res.data;
    this.jsonData = res.data;
  })
  .catch((error) => {
    console.log(error);
  });

axios 
  .get(this.api + '/autores')
  .then((res) => {
    this.autores = res.data;
  })
  .catch((error) => {
    console.log(error);
  });
},
getNombre(autor_id) {
            axios({
                method: 'get',
                url: this.api + '/autores?autor_id=' + autor_id
            })
                .then((response) => {
                    this.cities = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
pedirAutor() {
            this.getNombre(this.nuevoLibro.autor_id);
        },
        crearLibro() {
  axios.post(this.api + '/libros', this.nuevoLibro)
    .then((res) => {
      this.items.push(res.data);
      this.mostrarMensaje = true;
      this.mensajeCreacion = 'El libro se creó correctamente.';

      setTimeout(() => {
        this.ocultarMensaje();
      }, 3000); 

      this.resetForm();
    })
    .catch((error) => {
      console.log(error);
      this.mostrarMensaje = true;
      this.mensajeCreacion = 'Error al crear el libro. Por favor, inténtelo de nuevo.';
    });
},
    resetForm() {
      this.nuevoLibro = {
        titulo: '',
        autor_id: null,
        anio_publicacion: null,
        genero: ''
      };
    },
    eliminarLibro(libroId) {
    axios.delete(this.api + '/libros/' + libroId)
      .then(() => {
        this.items = this.items.filter((item) => item.id !== libroId);
        this.mostrarMensaje = true;
        this.mensajeCreacion = 'El libro se eliminó correctamente.';
      })
      .catch((error) => {
        console.log(error);
        this.mostrarMensaje = true;
        this.mensajeCreacion = 'Error al eliminar el libro. Por favor, inténtelo de nuevo.';
      });
  },
  editarModal(libro) {
  this.libroEditado = { ...libro }; 
  const modal = document.getElementById('editarModal');
  const instance = M.Modal.init(modal);
  instance.open();
},
    cancelarEdicion() {
      this.libroEditado = {
        id: null,
        titulo: "",
        autor_id: null,
        anio_publicacion: null,
        genero: "",
      };
      const modal = document.getElementById('editarModal');
      const instance = M.Modal.getInstance(modal);
      instance.close();
    },
    actualizarLibro() {
      axios
        .put(`${this.api}/libros/${this.libroEditado.id}`, this.libroEditado)
        .then(() => {
          const index = this.items.findIndex((item) => item.id === this.libroEditado.id);
          if (index !== -1) {
            this.items.splice(index, 1, this.libroEditado);
          }
          const modal = document.getElementById('editarModal');
          const instance = M.Modal.getInstance(modal);
          instance.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ocultarMensaje() {
    this.mostrarMensaje = false;
  },
    },
mounted(){
this.getItems();
this.pedirAutor();
},
    created(){
      setTimeout(()=>{
  var elems = document.querySelectorAll('select');
      var select = M.FormSelect.init(elems);
})
    },
  components: {
    Library,
  },
};
</script>



<style>
  .mensaje-creacion {
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
</style>