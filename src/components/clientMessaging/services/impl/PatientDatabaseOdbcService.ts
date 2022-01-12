import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientDatabaseOdbcService from '../IPatientDatabaseOdbcService'
// import oledb from 'oledb-electron'
import axios from 'axios'

@injectable()
export default class PatientDatabaseOdbcService extends Vue implements IPatientDatabaseOdbcService {
  private baseUrl: string = ' https://my.api.mockaroo.com/'
  private patientUri: string = 'mock-patient-data.json'
  private apiHeaders: any = { 'X-API-Key': 'cf7bbbd0' }

  private api = axios.create({
    baseURL: this.baseUrl,
    timeout: 13000,
    headers: this.apiHeaders
  })

  // private dbInstance = oledb.oledbConnection(this.getConnectionString)
  private dbInstance = ''

  private get getConnectionString () {
    return ''
  }

  async getListOfPatients () : Promise<IClientContactWithAppointment[]> {
    return this.api.get(`${this.patientUri}`)
      .then((res) => {
        return res.data as IClientContactWithAppointment[]
      })
  }
}
