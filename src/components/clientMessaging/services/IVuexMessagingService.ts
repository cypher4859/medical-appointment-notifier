import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../types/IMessageSmsDetails'
import IMessageSmsPayload from '../types/IMessageSmsPayload'
import type ISmsMessageTemplate from '../types/ISmsMessageTemplate'

export default interface IVuexMessagingService {
  getMessageTemplates () : Promise<ISmsMessageTemplate[]>
  getAddressBook () : Promise<IClientContactWithAppointment[]>
  getMessagesReceivedList () : Promise<IMessageSmsDetails[]>
  getMessagesSentList () : Promise<IMessageSmsDetails[]>
  loadAddressBook () : Promise<void>
  loadMessagesReceived () : Promise<void>
  loadMessagesSent () : Promise<void>
  loadMessageTemplates () : Promise<void>
  addToMessageTemplates (messageTemplate: ISmsMessageTemplate) : Promise<void>
  updateMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
  deleteMessageTemplate (template: ISmsMessageTemplate) : Promise<void>
  sendMessages (recipients: IMessageSmsPayload[]) : Promise<void>
  setApiKey (key: string) : Promise<void>
}
