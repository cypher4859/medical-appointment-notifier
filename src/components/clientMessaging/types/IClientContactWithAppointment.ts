import IAppointment from './IAppointment'
import IClientContact from './IClientContact'

export default interface IClientContactWithAppointment extends IClientContact, IAppointment {
}
