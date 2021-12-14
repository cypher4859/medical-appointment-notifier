import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'

export default interface IMessagingService {
  getMessageTemplates () : ISmsMessageTemplate[]
  getRecipientModes () : ISmsMessageTemplate[]
  getAddressBook () : IClientContactWithAppointment[]
  getAddressBookTableHeaders () : object[]
  sendMessages () : Promise<void>
}
