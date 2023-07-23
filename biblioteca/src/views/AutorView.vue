<template>
  <div>
      <div class="search-container">
      <label for="searchInput">Buscar por nombre del autor:</label>
      <input
        type="text"
        id="searchInput"
        v-model="searchQuery"
        @input="performSearch"
      />
      <label for="yearInput">Buscar por Fecha de Nacimiento:</label>
  <input
    type="number"
    id="yearInput"
    v-model="searchYear"
    @input="searchByBirthDate"
    min="1700"
  />
    </div>
    <Library>
      <template v-slot:lista>
        <table class="highlight responsive-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>NACIONALIDAD</th>
              <th>FECHA DE NACIMIENTO</th>
              <th>OBRAS</th>
              <th>ACCIONES</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.nombre }}</td>
              <td>{{ item.nacionalidad }}</td>
              <td>{{ item.fecha_nacimiento }}</td>
              <td>{{ item.obras_destacadas }}</td> 
              <td>
              <button class="waves-effect waves-light btn red lighten-2" @click="eliminarAutor(item.id)">
                <i class="material-icons left">delete</i>Eliminar
              </button>
            </td>
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
      <h4>Editar Autor</h4>
      <form @submit.prevent="editarAutor">
        <div>
          <label for="editNombre">Nombre:</label>
          <input type="text" id="editNombre" v-model="autorEditado.nombre" required />
        </div>
        <div>
          <label for="editNacionalidad">Nacionalidad:</label>
          <input type="text" id="editNacionalidad" v-model="autorEditado.nacionalidad" required />
        </div>
        <div>
          <label for="editFechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="editFechaNacimiento" v-model="autorEditado.fecha_nacimiento" required />
        </div>
        <div>
          <label for="editObrasDestacadas">Obras Destacadas:</label>
          <textarea id="editObrasDestacadas" v-model="autorEditado.obras_destacadas" required></textarea>
        </div>
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
        <div class="product">
          <h3>Agregar Nuevo Autor</h3>
          <form @submit.prevent="agregarAutor">
            <div>
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" v-model="nuevoAutor.nombre" required />
            </div>
            <div>
              <label for="nacionalidad">Nacionalidad:</label>
              <input type="text" id="nacionalidad" v-model="nuevoAutor.nacionalidad" required />
            </div>
            <div>
              <label for="fechaNacimiento">Fecha de Nacimiento:</label>
              <input type="date" id="fechaNacimiento" v-model="nuevoAutor.fecha_nacimiento" required />
            </div>
            <div>
              <label for="obrasDestacadas">Obras Destacadas:</label>
              <textarea id="obrasDestacadas" v-model="nuevoAutor.obras_destacadas" required></textarea>
            </div>
            <div v-if="showSuccessMessage" class="success-message">
    {{ successMessage }}
  </div>
            <button type="submit" class="btn green">
      <i class="material-icons left">add</i> Agregar
    </button>
          </form>
        </div>
      </template>
    </Library>
  </div>
</template>

<script>

import Library from '@/components/Autor.vue'
import axios from 'axios';

export default {
  name: 'BibliotecaView',
  data(){
    const api='http://localhost:3000';
    return{
      api,
      jsonData: null,
      items:[],
      nuevoAutor: {
        nombre: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        obras_destacadas: ''
      },
      autorEditado: {
        id: null,
        nombre: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        obras_destacadas: ''
      },
      searchQuery: '',
      searchYear: '',
      showSuccessMessage: false,
      successMessage: ''
    }
  },
  created(){
    axios.get(this.api + '/autores')
    .then(res => {
      this.items=res.data;
        this.jsonData=res.data;
    })
    .catch(error=>{
        console.log(error);
    })
 },
 methods: {
  agregarAutor() {
      axios
        .post(this.api + '/autores', this.nuevoAutor)
        .then((res) => {
          this.items.push(res.data);
          this.nuevoAutor = {
            nombre: '',
            nacionalidad: '',
            fecha_nacimiento: '',
            obras_destacadas: '',
          };
          this.successMessage = 'Autor creado correctamente.';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarAutor(id) {
      axios
        .delete(`${this.api}/autores/${id}`)
        .then(() => {
          this.items = this.items.filter((item) => item.id !== id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editarModal(autor) {
      this.autorEditado = { ...autor }; 
      const modal = document.getElementById('editarModal');
      const instance = M.Modal.init(modal);
      instance.open();
    },
    editarAutor() {
      axios
        .put(`${this.api}/autores/${this.autorEditado.id}`, this.autorEditado)
        .then(() => {
          const index = this.items.findIndex((item) => item.id === this.autorEditado.id);
          if (index !== -1) {
            this.items.splice(index, 1, this.autorEditado);
          }
          const modal = document.getElementById('editarModal');
          const instance = M.Modal.getInstance(modal);
          instance.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelarEdicion() {
      this.autorEditado = {
        id: null,
        nombre: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        obras_destacadas: ''
      };
      const modal = document.getElementById('editarModal');
      const instance = M.Modal.getInstance(modal);
      instance.close();
    },
    performSearch() {
      if (this.searchQuery.trim() === '') {
        this.items = this.jsonData;
      } else {
        this.items = this.jsonData.filter((item) =>
          item.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    searchByBirthDate() {
  this.items = this.jsonData.filter(
    (item) => new Date(item.fecha_nacimiento).getFullYear() > this.searchYear
  );
},
  },
  components: {
    Library
  }
}
</script>


<style>
 .product{
  margin-top: 3%;
 }
 table { 
  border-collapse: collapse; 
  margin: 25px 0; 
  font-size: 1em; 
  font-family: sans-serif; 
  min-width: 450px; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 
  }
table thead tr { 
  background-color: #4A148C; 
  color: #ffffff; 
  text-align: center; 
  }
table th, table td { 
  padding: 12px 15px; 
}
table tbody tr { 
  border-bottom: 1px solid #dddddd; 
} 
table tbody tr:nth-of-type(even) { 
  background-color: #f3f3f3; 
}
table tbody tr:last-of-type {
  border-bottom: 2px solid #180129; 
}
.success-message {
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
</style>