<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
      <b-col cols="12" md="6">
          <div class="card">  
            <div class="card-header">
              Detalle de equipo {{ id }}
            </div>
            <div class="card-body">
              <div class="loading" v-if="loading">
                Loading...
              </div>
              <div v-if="!loading" class="content">
                <table class="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <td><label for="name"><b>Numero:</b></label></td>
                      <td><label for="name">{{equipo.id}}</label></td>
                    </tr>
                    <tr>
                      <td><label for="name"><b>I.M.E.I.:</b></label></td>
                      <td><label for="name">{{equipo.imei}}</label></td>
                    </tr>
                    <tr>
                      <td><label for="name"><b>Lote:</b></label></td>
                      <td><label for="name">{{equipo.lote.desc}}</label></td>
                    </tr>
                    <tr>
                      <td><label for="name"><b>Version hard.:</b></label></td>
                      <td><label for="name">{{equipo.lote.version_hardware.desc}}</label></td>
                    </tr>
                    <tr>
                      <td><label for="name"><b>Version Firm.:</b></label></td>
                      <td><label for="name">{{equipo.version_firmware.desc}}</label></td>
                    </tr>
                    <tr>
                      <td><label for="name"><b>Tipo:</b></label></td>
                      <td><label for="name">{{equipo.lote.version_hardware.tipo.desc}}</label></td>
                    </tr>                     
                    <tr>
                      <td><label for="name"><b>Estado:</b></label></td>
                      <td><label for="name"> <b-badge pill :variant="equipo.estado.color"> {{equipo.estado.desc}}</b-badge></label></td>
                    </tr>     
                  </tbody>
                </table>  
              </div>
              <router-link :to="{ path: '../lista/' }"><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-ban"></i>Volver</button></router-link>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <div class="card">  
            <div class="card-header">
              Acciones
            </div>
            <div class="card-body">
              <div class="loading" v-if="loadinge">
                Loading...
              </div>
              <div v-if="!loadinge" class="content">
                  
                <div v-if="equipo.estado.id === 1">
                  <b-button type="button" variant="info" @click="grabaModal = true">Grabar firmware</b-button>
                </div>
                <div v-if="equipo.estado.id === 2">
                  <b-button type="button" variant="success" @click="testModal = true">Realizar test</b-button>
                </div>
                <div v-if="equipo.estado.id === 3">
                  <b-button type="button" variant="warning" @click="revisaModal = true">Revisar</b-button>
                </div>
                <div v-if="equipo.estado.id === 5">
                  <b-button type="button" variant="success" @click="installModal = true">Instalar</b-button>
                </div>
                <div v-if="equipo.estado.id === 6">
                  <b-button type="button" variant="danger" @click="errorModal = true">Error en equipo</b-button>&nbsp;
                  <b-button type="button" variant="info" @click="bajaModal = true">Baja de abono</b-button>
                </div>
                <div v-if="equipo.estado.id === 7">
                  <b-button type="button" variant="warning" @click="revisaModal = true">Reparación</b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="card">  
            <div class="card-header">
              Eventos
            </div>
            <div class="card-body">
              <div class="loading" v-if="loadinge">
                Loading...
              </div>
              <div v-if="!loadinge" class="content">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Evento</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Responsable</th>
                    </tr>                    
                  </thead>
                  <tbody>
                    <tr v-for="evento in eventos">
                      <td>{{ evento.tipo.desc }}</td>
                      <td>{{ evento.fecha }}</td>
                      <td>{{evento.hora}}</td>
                      <td>{{evento.responsable.username}}</td>
                    </tr>
                  </tbody>
                </table>  
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
<!--MODALS-->
    <b-modal title="Grabación de firmware" class="modal-info" v-model="grabaModal" @ok="infoModal = false" ok-variant="info"  hide-footer>
      Usted va a proceder a la grabacion de firmware. Eligiendo aceptar usted confirma todo lo que es el grabamiento de firmware. Si apreta cancelar, vuelve atras pero si apreta no grabar lo que hace es poner el equipo en el estado de revision dando a entender que el proceso de grabado de firmware no fue satisfactorio.
      <br/><br/>
      <b>Version de firmware a grabar:</b><br>
      <b-form-group>
            <b-form-select id="basicSelect"
              :plain="true"
              :options="options"
              :value="def"
              v-model="def"
              >
            </b-form-select>
        </b-form-group>
      <b-btn type="button" variant="info"  @click="graba(2,def)">Grabación OK</b-btn>&nbsp;
      <b-btn type="button" variant="warning"  @click="graba(3)">Fallo</b-btn>&nbsp;
      <b-btn type="button" variant="secondary" @click="grabaModal = false">Cancelar</b-btn>      
    </b-modal> 

    <b-modal title="Revision/Reparación de equipo" class="modal-info" v-model="revisaModal" @ok="infoModal = false" ok-variant="info" hide-footer>
      Usted va a proceder a la revision o reparación de equipo. Eligiendo "Reparado" usted confirma una reparación exitosa y el equipo pasa a estado grabado. Eligiendo "Pérdida" envía el equipo al estado de perdida
      <br/><br/>
      <b>Version de firmware a grabar:</b><br>
      <b-form-group>
            <b-form-select id="basicSelect"
              :plain="true"
              :options="options"
              :value="def"
              v-model="def"
              >
            </b-form-select>
        </b-form-group>
      <b-btn type="button" variant="success"  @click="graba(2,def)">Reparado</b-btn>&nbsp;
      <b-btn type="button" variant="danger"  @click="graba(4)">Perdida</b-btn>&nbsp;
      <b-btn type="button" variant="secondary" @click="revisaModal = false">Cancelar</b-btn>      
    </b-modal> 

    <b-modal title="Test" class="modal-info" v-model="testModal" @ok="infoModal = false" ok-variant="info"  hide-footer>
      Usted va a proceder a grabar el resultado del testeo
      Eligiendo "Test exitoso" usted confirma un test exitoso y el equipo pasa a estado "En stock". 
      Si Epreta "Test fallido", envia el equipo al estado de revision
      <br><br>
      <b-form @submit="guardar">
        <table class="table table-striped table-sm">
          <tbody>
            <tr>
              <td><strong>Claro</strong></td>
              <td>      
                <b-form-input required 
                  id="imeic" type="number" placeholder="Numero">
                  </b-form-input>
              </td>
              <td>
                <b-form-input required 
                      id="imsic" type="number" placeholder="imsi">
                </b-form-input>
              </td>
            </tr>
            <tr>
              <td><strong>Personal</strong></td>
              <td>      
                <b-form-input required 
                  id="imeip" type="number" placeholder="Numero">
                  </b-form-input>
              </td>
              <td>
                <b-form-input required 
                      id="imsip" type="number" placeholder="imsi">
                </b-form-input>
              </td>
            </tr>
          </tbody>
        </table> 
        </b-form-input>
        <b-button variant="success" type="submit">Test OK</b-button>&nbsp;
        <b-btn type="button" variant="danger"  @click="graba(3)">Test fallido</b-btn>&nbsp;
        <b-btn type="button" variant="secondary" @click="testModal = false">Cancelar</b-btn>        
      </b-form>
    </b-modal>     

    <b-modal title="Instalación" class="modal-success" v-model="installModal" @ok="infoModal = false" ok-variant="info" hide-footer>
      Usted va a proceder a grabar el resultado de la instalación.
      Eligiendo "Instalación OK" usted confirma una instalación exitosa y el equipo pasa a estado "Instalado". 
      Eligiendo "Instalación Fallida" usted graba una instalación fallida y el equipo pasa a reparación.
      <br/><br/>
      <b-btn type="button" variant="success"  @click="graba(6)">Instalación OK</b-btn>&nbsp;
      <b-btn type="button" variant="danger"  @click="graba(7)">Instalación fallida</b-btn>&nbsp;
      <b-btn type="button" variant="secondary" @click="installModal = false">Cancelar</b-btn>                          
    </b-modal> 

    <b-modal title="Error" class="modal-danger" v-model="errorModal" @ok="dangerModal = false" ok-variant="danger" hide-footer>
     Eligiendo "Error" usted confirma que el equipo tuvo un error durante el funcionamiento.
     <br/><br/>
     <b-btn type="button" variant="danger"  @click="graba(7)">Error</b-btn>&nbsp;
     <b-btn type="button" variant="secondary" @click="errorModal = false">Cancelar</b-btn>                          
    </b-modal>

    <b-modal title="Baja" class="modal-info" v-model="bajaModal" @ok="infoModal = false" ok-variant="info" hide-footer>
      Eligiendo "Confirmar" usted confirma que el cliente dio de baja el abono asociado a este equipo.
      <br/><br/>
      <b-btn type="button" variant="info"  @click="graba(2)">Confirmar</b-btn>&nbsp;
      <b-btn type="button" variant="secondary" @click="bajaModal = false">Cancelar</b-btn>                          
    </b-modal>     

  </div>
</template>

<script>
import Vue from 'vue';
import DataService from './../../../services/DataService';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const dataservice = new DataService();
const items = [{name:"Nombre", value: "juan"}];
var equipoupdate = {};

export default {
  data () {
    return {
      options: [],
      def: this.def,
      id: this.$route.params.id,
      items: items,
      loading: true,
      loadinge: true,
      equipo: this.equipo,
      grabaModal: false,
      infoModal: false,
      revisaModal: false,
      testModal: false,
      installModal: false,
      errorModal: false,
      bajaModal: false,
      eventos: [],
      imeip : "",
      imsip : "",
      imeic : "",
      imsic : "",

    }
  },
  created () {
      this.getEquipo();
  },
  watch: {
    'def' : function(){
      //console.log(this.def);
    }
  },
  methods: {
    getEquipo(){
      dataservice.getEquipo(this.$route.params.id).then( result => {
        //console.log(result.data);
        this.equipo = result.data;
        if (!this.equipo.version_firmware){
          this.equipo.version_firmware = {desc: '---'}
        }
      })
      .then(()=>{
        dataservice.getFirmwareVersions(this.equipo.lote.version_hardware.tipo.id)
        .then(result => {
          this.def = result.data[result.data.length-1].id;
          this.options = result.data.map(function(obj){
            var rObj = {};
            rObj.value = obj.id;
            rObj.text = obj.version_firmware.desc;
            return (rObj);
          });
          dataservice.getEventos(this.$route.params.id).then( result => {
            this.eventos = result.data;
          }).then(()=>{this.loadinge = false;this.loading = false})
        });
      });  
    },
    graba(estado, version_firm) {
      equipoupdate.estado = estado;
      if (version_firm) {
        equipoupdate.version_firmware = version_firm
      }
      dataservice.updateEquipo(this.$route.params.id, equipoupdate, cookies.get('token'))
        .then((result) => {
          console.log("realizando re render");
          this.grabaModal =  false;
          this.infoModal =  false;
          this.revisaModal =  false;
          this.testModal =  false;
          this.installModal =  false;
          this.errorModal =  false;
          this.bajaModal =  false;
          this.getEquipo();
        })
    },
    guardar(evt){
      evt.preventDefault();
      console.log("imeip:"+evt.target.elements.imeip.value);
      console.log("imsip:"+evt.target.elements.imsip.value);
      console.log("imeic:"+evt.target.elements.imeic.value);
      console.log("imsic:"+evt.target.elements.imsic.value);
      this.lineas = {
        imsi_claro : evt.target.elements.imsic.value,
        nro_claro : evt.target.elements.imeic.value,
        imsi_personal : evt.target.elements.imsip.value,
        nro_personal : evt.target.elements.imeip.value,
        equipo_id : this.$route.params.id,

      };
      console.log(this.lineas);
      dataservice.createLineas(this.lineas).then(()=>{
       this.graba(5)
    });

    }
  }
}
</script>
