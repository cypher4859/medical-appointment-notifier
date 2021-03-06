import type IAppointment from '../types/IAppointment'
import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'

export default interface IVuexPatientService {
  getListOfPatients () : Promise<IClientContactWithAppointment[]>
  loadPatientList () : Promise<IClientContactWithAppointment[]>
  setConnectionType (type: string) : Promise<void>
  getConnectionType () : Promise<string>
}
