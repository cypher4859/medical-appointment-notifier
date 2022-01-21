import IPatientAppointment from './IPatientAppointment'
import IPatientBasicInfo from './IPatientBasicInfo'

export default interface IPatient extends IPatientBasicInfo, IPatientAppointment {
}
