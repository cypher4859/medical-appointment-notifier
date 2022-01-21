import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import IPatient from '../../types/IPatient'
import IPatientAppointment from '../../types/IPatientAppointment'
import type IPatientDatabaseJconnService from '../IPatientDatabaseJconnService'
@injectable()
export default class PatientDatabaseJconnService extends Vue implements IPatientDatabaseJconnService {
  private connectionString: string = 'DRIVER={FreeTSD};SERVER=local;UID=adssys;PWD=;DATABASE=ADTDemoData'

  async getListOfPatients () : Promise<IPatient[]> {
    return []
  }

  async mapAppointmentToPatient (patients: IPatientAppointment[]) : Promise<IPatient[]> {
    return []
  }
}
