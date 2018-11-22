<template>
  <div class="animated fadeIn">
    <div class="card">  
      <div class="card-header">
        <table style="width:100%;">
          <tbody>
            <tr>
              <td><b>Equipos</b></td>
              <td align="right"><b-button type="button" variant="success" @click="alta()">Nuevo equipo</b-button></td>
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
import DataService from './../../../services/DataService';
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
          key: 'eq_id',
          label: 'EQ ID',
          sortable: true,
        },
        {
          key: 'lote.version_hardware.tipo.desc',
          label: 'MODELO',
          sortable: true,
        },
        {
          key: 'lote.version_hardware.vh_cod',
          label: 'VERSIÓN HARD',
          sortable: true,
        },
        {
          key: 'lote.lote_cod',
          label: 'LOTE',
          sortable: true,
        },
        {
          key: 'controlado',
          label: 'CONTROLADO',
          sortable: true,
        },        
        {
          key: 'imei',
          label: 'IMEI',
          sortable: true,
        },
        {
          key: 'version_firmware.vf_cod',
          label: 'FIRMWARE',
          sortable: true,
        },
        {
          key: 'nro_claro',
          label: 'Linea Claro',
          sortable: true,
        },
        {
          key: 'nro_personal',
          label: 'Linea Personal',
          sortable: true,
        },
        {
          key: 'activado',
          label: 'Activado',
          sortable: true,
        },
        {
          key: 'estado',
          label: 'Estado',
          formatter: 'fullName'
        },
        {
          key: 'id',
          label: 'Detalle',
        },
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
      dataservice.getEquipos(currentPage,10).then( result => {
        this.count = result.data.count;
        this.equipos = result.data.results;      
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
