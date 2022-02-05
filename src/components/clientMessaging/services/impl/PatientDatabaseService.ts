import TYPES from '@/InjectableTypes/types'
import { inject } from 'inversify'
import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import IPatient from '../../types/IPatient'
import IPatientAppointment from '../../types/IPatientAppointment'
import type IPatientDatabaseJconnService from '../IPatientDatabaseJconnService'
import type IPatientDatabaseOdbcService from '../IPatientDatabaseOdbcService'
import IPatientDatabaseService from '../IPatientDatabaseService'
import PatientDatabaseEnvironments from '../PatientDatabaseEnvironments'
@injectable()
export default class PatientDatabaseService extends Vue implements IPatientDatabaseService {
  private selectedEnvironment: string = PatientDatabaseEnvironments.ADVANTAGE_ODBC

  @inject(TYPES.IPatientDatabaseOdbcService)
  private patientDatabaseOdbcService!: IPatientDatabaseOdbcService

  @inject(TYPES.IPatientDatabaseJconnService)
  private patientDatabaseJconnService!: IPatientDatabaseJconnService

  async getListOfPatients () : Promise<IPatient[]> {
    return []
  }

  async mapAppointmentToPatient (patients: IPatientAppointment[]) : Promise<IPatient[]> {
    return []
  }

  getDatabaseEnvironmentService () : IPatientDatabaseOdbcService|IPatientDatabaseJconnService|undefined {
    if (this.selectedEnvironment === PatientDatabaseEnvironments.ADVANTAGE_ODBC) {
      return this.patientDatabaseOdbcService
    } else if (this.selectedEnvironment === PatientDatabaseEnvironments.ADVANTAGE_JCONN) {
      return this.patientDatabaseJconnService
    } else {
      return undefined
    }
  }
}
