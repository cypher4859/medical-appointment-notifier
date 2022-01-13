import IClientContactWithAppointment from '../types/IClientContactWithAppointment'

export default interface IPatientDatabaseService {
  getListOfPatients() : Promise<any[]>
}
