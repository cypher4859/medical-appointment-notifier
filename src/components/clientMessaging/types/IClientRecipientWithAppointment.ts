import IAppointment from './IAppointment'
import IClientRecipient from './IClientRecipient'

export default interface IClientRecipientWithAppointment extends IClientRecipient, IAppointment {
}
