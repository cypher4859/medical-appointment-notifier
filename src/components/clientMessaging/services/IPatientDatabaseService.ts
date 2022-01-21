import IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IPatient from '../types/IPatient'
import IPatientAppointment from '../types/IPatientAppointment'
import IPatientBasicInfo from '../types/IPatientBasicInfo'

export default interface IPatientDatabaseService {
  getListOfPatients() : Promise<IPatient[]>
  mapAppointmentToPatient(patients: IPatientAppointment[]) : Promise<IPatient[]>
}
