import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'

export default interface IApiPatientService {
  getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]>
}
