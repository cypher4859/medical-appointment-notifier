import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientDatabaseJconnService from '../IPatientDatabaseJconnService'
@injectable()
export default class PatientDatabaseJconnService extends Vue implements IPatientDatabaseJconnService {
  private connectionString: string = 'DRIVER={FreeTSD};SERVER=local;UID=adssys;PWD=;DATABASE=ADTDemoData'

  async checkConnection () : Promise<void> {
    // console.log('Getting Status')
    // const status = this.jconnInstance.connected
    // console.log('Connected Status: ', status)
    // return status
  }

  async testConnectionToDatabase () : Promise<void> {
    //
  }

  async getListOfPatients (): Promise<IClientContactWithAppointment[]> {
    return []
  }
}
