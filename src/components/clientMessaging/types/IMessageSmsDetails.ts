import IAppointment from './IAppointment'
import IMessageSms from './IMessageSms'

export default interface IMessageSmsDetails extends IMessageSms, IAppointment {
  fullName: string
}
