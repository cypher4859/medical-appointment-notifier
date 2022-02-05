import type IAppointment from '../types/IAppointment'
import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'

export default interface IPatientService {
  getNextAppointmentOfPatient (patient: IClientContactWithAppointment) : IAppointment
  getAppointmentListOfPatient (patient: IClientContactWithAppointment) : IAppointment[]
  getPatientByNameAndBirthDate (name: string) : IClientContactWithAppointment | undefined
  getListOfPatients () : Promise<IClientContactWithAppointment[]>
  loadPatientList () : Promise<IClientContactWithAppointment[]>
  setConnectionType (type: string) : Promise<void>
  getConnectionType () : Promise<string>
}
