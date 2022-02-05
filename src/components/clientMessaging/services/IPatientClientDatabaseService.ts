import IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IPatient from '../types/IPatient'
import IPatientAppointment from '../types/IPatientAppointment'
import IPatientBasicInfo from '../types/IPatientBasicInfo'
import IPatientDatabaseJconnService from './IPatientDatabaseJconnService'
import IPatientDatabaseOdbcService from './IPatientDatabaseOdbcService'

export default interface IPatientClientDatabaseService {
  getListOfPatients() : Promise<IPatient[]>
  mapAppointmentToPatient(patients: IPatientAppointment[]) : Promise<IPatient[]>
}
