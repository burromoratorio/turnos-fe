<template>
  <div class="animated fadeIn">
    <div class="card">  
      <div class="card-header">
        <table style="width:100%;">
          <tbody>
            <tr>
              <td><b>Profesionales</b></td>
              <td align="right"><b-button type="button" variant="success" @click="alta()">Agregar profesional</b-button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-body">
        <div class="post">
          <div class="loading" v-if="loading">
            Loading...
          </div>
          <div v-if="!loading" class="content">

            <b-table striped hover outlined small :items="equipos" :fields="fields">
              <template slot="estado" slot-scope="row">
              <b-badge pill :variant="row.item.estado.color"> {{row.item.estado.desc}}</b-badge>
            </template>

            <template slot="id" slot-scope="row">
              <router-link :to="{ name: 'Detalle', params: {id: row.item.id } }">
              <b-button size="sm""><i class="cui-action-redo icons"></i></b-button>
              </router-link>
            </template>
            </b-table>
              <nav>
    
                <b-pagination 
                  align="center" prev-text="Anterior" next-text="Siguiente" 
                  :total-rows="count" 
                  :per-page="perPage" 
                  v-model="currentPage"
                  @input="cambio('click', $event.target)" 
                  hide-goto-end-buttons/>
              </nav> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue';
import DataService from './../../services/DataService';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var equipos = [];
var post = null;
const dataservice = new DataService();

export default {
  data () {
    return {
      loading: false,
      post: null,
      equipos:[],
      fields: [
        {
          key: 'nombre',
          label: 'Nombre',
          sortable: true,
        },
        {
          key: 'apellido',
          label: 'Apellido',
          sortable: true,
        }
      ],
      currentPage: this.current, perPage: 10,   
    }
  },
  created () {
    this.currentPage=1;
    this.fetchData(this.currentPage)
    //console.log(cookies.get('token'));
  },
  
  watch: {
    '$route': 'fetchData'
  },

  methods: {
      cambio(){
        this.fetchData(this.currentPage);
      },

      fetchData (currentPage) {
      this.loading = true
      dataservice.getProfesionales(currentPage,10).then( result => {
        this.count = result.data.count;
        this.equipos = result.data.results;  
        console.log(result.data.count)    
      }).then(()=>{
      this.loading = false;

      });  
    },
    alta(){
     this.$router.push({ path: "/prod/equipos/alta"});
    }
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
</script>
