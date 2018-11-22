<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Nuevo equipo</strong> 
      </div>
      <!-- Bootstrap Vue has some problems with Inline forms that's why we use some standard bootstrap classes -->
      <b-form @submit="guardar">
        <b-form-group
          label="Lote"
          label-for="lote"
          :label-cols="3"
          :horizontal="true">
            <b-form-select id="basicSelect"
              name="lote"
              :plain="true"
              :options="options"
              :value="def">
            </b-form-select>
        </b-form-group>
        <b-form-group
          name="imei"
          label="I.M.E.I.:"
          label-for="imei"
          :label-cols="3"
          :horizontal="true">
            <b-form-input required :state="numberState" 
                              v-model.trim="imei"
            id="imei" type="number" placeholder="Numero de imei"></b-form-input>
        </b-form-group>
        <div slot="footer">
          <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Guardar</b-button>
          <router-link :to="{ path: '../equipos/lista/' }">
            <button type="button" class="btn btn-danger btn-sm"><i class="fa fa-ban"></i>Volver</button>
          </router-link>          
        </div>
      </b-form>
    </b-card>
  </div>
</template>


<script>
import Vue from 'vue';
import DataService from './../../../services/DataService';
import Cookies from 'universal-cookie';

const dataservice = new DataService();
const cookies = new Cookies();
var lotes = [];


export default {
  computed: {
    numberState(){
      return this.imei.length == 15 ? true : false
    }
  },
  data () {
    return {
       def : 0,
       imei: "",
       options: [
        
      ]
    }
  },
  created () {
      dataservice.getLotes().then( result => {
      //this.def = result.data[0].id;
        console.log(result.data);
        this.options = result.data.map(function(obj){
          var rObj = {};
          rObj.value = obj.id;
          rObj.text = obj.version_hardware.tipo.desc+ " - "+obj.desc;
          return (rObj);
        })
        
        //console.log(result.data);
        this.lotes=result.data;
        //console.log();
      })


  },
  watch: {
  },
  methods: {
    guardar(evt){
      evt.preventDefault();
      console.log("imei:"+evt.target.elements.imei.value);
      console.log("lote:"+evt.target.elements.lote.value);
      dataservice.createEquipo(
        {
          imei: evt.target.elements.imei.value,
          lote: evt.target.elements.lote.value,
          estado: 1
        },
        cookies.get('token')
      ).then(()=>{
        this.$router.push({ path: '../equipos/lista/'});
      })


    }
  }
}
</script>

