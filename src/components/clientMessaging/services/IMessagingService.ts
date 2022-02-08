import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import IMessageSmsDetails from '../types/IMessageSmsDetails'
import IMessageSmsPayload from '../types/IMessageSmsPayload'

export default interface IMessagingService {
  getMessageTemplates () : Promise<ISmsMessageTemplate[]>
  getRecipientModes () : object[]
  getAddressBook () : Promise<IClientContactWithAppointment[]>
  getAddressBookTableHeaders () : object[]
  sendMessages (recipients: IMessageSmsPayload[]) : Promise<void>
  compileMessages (recipients: IClientContactWithAppointment[], messageTemplate: string) : IMessageSmsPayload[]
  getMessageTransformedKeyword (messageTemplate: string, recipient: IClientContactWithAppointment) : string
  getMessagesReceivedList () : Promise<IMessageSmsDetails[]>
  getMessagesSentList () : Promise<IMessageSmsDetails[]>
  getMessageDetailsTableFields () : string[]
  getDefaultMessagingTemplate () : ISmsMessageTemplate
  getMessageTemplateKeywords () : string[]
  getMessageTransformedKeywordFromTemplate (message: ISmsMessageTemplate, patient: IClientContactWithAppointment) : ISmsMessageTemplate
  getExamplePatient () : Promise<IClientContactWithAppointment>
  loadAddressBook () : Promise<void>
  loadMessagesReceived () : Promise<void>
  loadMessagesSent () : Promise<void>
  loadMessageTemplates () : Promise<void>
  addMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
  deleteMessageTemplate (template: ISmsMessageTemplate) : Promise<void>
  updateMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void>
  setApiKey (key: string) : Promise<void>
  clearStore () : Promise<void>
  getAutomaticMessagePromptSettingLocalStorage () : Promise<boolean>
  setAutomaticMessagePromptSettingLocalStorage (autoMessageSetting: boolean) : Promise<void>
}
