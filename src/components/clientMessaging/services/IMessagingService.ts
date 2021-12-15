import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IMessageSmsDetails from '../types/IMessageSmsDetails'

export default interface IMessagingService {
  getMessageTemplates () : ISmsMessageTemplate[]
  getRecipientModes () : ISmsMessageTemplate[]
  getAddressBook () : IClientContactWithAppointment[]
  getAddressBookTableHeaders () : object[]
  sendMessages () : Promise<void>
  getMessagesReceivedList () : IMessageSmsDetails[]
  getMessagesSentList () : IMessageSmsDetails[]
  getMessageDetailsTableFields () : string[]
  loadAddressBook () : Promise<void>
  loadMessagesReceived () : Promise<void>
  loadMessagesSent () : Promise<void>
}
