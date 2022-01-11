import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IPatientDatabaseJconnService from './IPatientDatabaseJconnService'
import IPatientDatabaseOdbcService from './IPatientDatabaseOdbcService'

export default interface IApiPatientService {
  getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]>
}
