import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import IPatient from '../../types/IPatient'
import IPatientAppointment from '../../types/IPatientAppointment'
import type IPatientDatabaseJconnService from '../IPatientDatabaseJconnService'
import PatientDatabaseService from './PatientDatabaseService'
@injectable()
export default class PatientDatabaseJconnService extends Vue implements IPatientDatabaseJconnService {
  private connectionString: string = 'DRIVER={FreeTSD};SERVER=local;UID=adssys;PWD=;DATABASE=ADTDemoData'

  async getListOfPatients () : Promise<IPatient[]> {
    return []
  }

  async mapAppointmentToPatient (patients: IPatientAppointment[]) : Promise<IPatient[]> {
    return []
  }

  setConnectionType () : void {
    console.log('JCONN database service is not implemented.')
  }

  getConnectionType () : string {
    console.log('JCONN database service is not implemented.')
    return ''
  }
}
