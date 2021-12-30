import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../types/IMessageSmsDetails'
import IMessageSmsPayload from '../types/IMessageSmsPayload'
import type ISmsMessageTemplate from '../types/ISmsMessageTemplate'

export default interface IApiMessagingService {
  getAddressBookFromApi () : Promise<IClientContactWithAppointment[]>
  getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]>
  getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]>
  getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]>
  addMessageTemplatesByApi (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
  modifyMessageTemplatesByApi (template: ISmsMessageTemplate) : Promise<void>
  deleteMessageTemplateByApi (template: ISmsMessageTemplate) : Promise<void>
  sendMessagesByApi (recipients: IMessageSmsPayload[]) : Promise<void>
  setApiKey (key: string) : Promise<void>
}
