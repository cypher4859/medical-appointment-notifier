import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../types/IMessageSmsDetails'
import type ISmsMessageTemplate from '../types/ISmsMessageTemplate'

export default interface IApiMessagingService {
  getAddressBookFromApi () : Promise<IClientContactWithAppointment[]>
  getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]>
  getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]>
  getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]>
  addMessageTemplatesByApi () : Promise<void>
  modifyMessageTemplatesByApi () : Promise<void>
  deleteMessageTemplateByApi () : Promise<void>
  sendMessagesByApi () : Promise<void>
}
