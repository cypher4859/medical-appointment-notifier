import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IMessageSmsDetails from '../types/IMessageSmsDetails'

export default interface IMessagingService {
  getMessageTemplates () : Promise<ISmsMessageTemplate[]>
  getRecipientModes () : object[]
  getAddressBook () : Promise<IClientContactWithAppointment[]>
  getAddressBookTableHeaders () : object[]
  sendMessages () : Promise<void>
  getMessagesReceivedList () : Promise<IMessageSmsDetails[]>
  getMessagesSentList () : Promise<IMessageSmsDetails[]>
  getMessageDetailsTableFields () : string[]
  getDefaultMessagingTemplate () : ISmsMessageTemplate
  getMessageTemplateKeywords () : string[]
  getMessageTransformedKeyword (message: ISmsMessageTemplate, patient: IClientContactWithAppointment) : ISmsMessageTemplate
  getExamplePatient () : Promise<IClientContactWithAppointment>
  loadAddressBook () : Promise<void>
  loadMessagesReceived () : Promise<void>
  loadMessagesSent () : Promise<void>
  loadMessageTemplates () : Promise<void>
  addMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
  deleteMessageTemplate (template: ISmsMessageTemplate) : Promise<void>
  updateMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
}
