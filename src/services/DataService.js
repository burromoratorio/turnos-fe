
import axios from 'axios';
import { AppSettings} from './settings';

export default class DataService {

  constructor() {
    this.baseUrl = AppSettings.API_ENDPOINT;      
  }

  getProfesionales(){
    const url = this.baseUrl+'profesionales';
    return(axios.get(url));
  }

}
