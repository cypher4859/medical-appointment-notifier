import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientDatabaseOdbcService from '../IPatientDatabaseOdbcService'
import axios from 'axios'
// import adt from 'node_adt'
// import oledb from 'oledb-electron'
import odbc from 'odbc'

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

  // private dbInstance = odbc.connect(this.getConnectionString)
  // private dbInstance = ''

  private get getConnectionString () {
    // the oledb connection string = return 'Driver=SQLOLEDB;Network Library=DBMSSOCN;Data Source=127.0.0.1,3306;Initial Catalog=patientListDatabase;User id=root;Password=root'
    // return 'DRIVER={MariaDB ODBC 3.1};TCPIP=1;SERVER=localhost;USER=root;PASSWORD=root;DATABASE=patientListDatabase;PORT=3306'
    return 'DSN=test-mariadb-odbc'
  }

  async getListOfPatients () : Promise<IClientContactWithAppointment[]> {
    return this.testGetListOfPatients()
    // return this.api.get(`${this.patientUri}`)
    //   .then((res) => {
    //     return res.data as IClientContactWithAppointment[]
    //   })
  }

  private async testGetListOfPatients () : Promise<any> {
    const dbInstance = await odbc.connect(this.getConnectionString)
    const x = await dbInstance.query('SELECT * FROM PATIENTLIST')
    console.log('Results:', x)
    return x
  }
}
