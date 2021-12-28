import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import { inject } from 'inversify'
import MessagingStore from '../../state-management/MessagingStore'
import { getModule } from 'vuex-module-decorators'
import TYPES from '@/InjectableTypes/types'
import type IVuexMessagingService from '../IVuexMessagingService'
import type ISmsMessageTemplate from '../../types/ISmsMessageTemplate'
import type IMessageSmsDetails from '../../types/IMessageSmsDetails'
import type IApiMessagingService from '../IApiMessagingService'
import IMessageSmsPayload from '../../types/IMessageSmsPayload'

const messagingStore = getModule(MessagingStore)

@injectable()
export default class VuexMessagingService extends Vue implements IVuexMessagingService {
  @inject(TYPES.IApiMessagingService)
  private apiMessagingService!: IApiMessagingService

  async getMessageTemplates () : Promise<ISmsMessageTemplate[]> {
    const messageTemplates = messagingStore.getMessageTemplates
    if (!messageTemplates.length) {
      return this.loadMessageTemplates()
        .then(() => {
          return messagingStore.getMessageTemplates
        })
    } else {
      return messageTemplates
    }
  }

  async getAddressBook () : Promise<IClientContactWithAppointment[]> {
    const addressBook = messagingStore.getAddressBook
    if (!addressBook.length) {
      return this.loadAddressBook()
        .then(() => {
          return messagingStore.getAddressBook
        })
    } else {
      return addressBook
    }
  }

  async getMessagesReceivedList () : Promise<IMessageSmsDetails[]> {
    const messagesReceived = messagingStore.getMessagesReceived
    if (!messagesReceived.length) {
      return this.loadMessagesReceived()
        .then(() => {
          return messagingStore.getMessagesReceived
        })
    } else {
      return messagesReceived
    }
  }

  async getMessagesSentList () : Promise<IMessageSmsDetails[]> {
    const messagesSent = messagingStore.getMessagesSent
    if (!messagesSent.length) {
      return this.loadMessagesSent()
        .then(() => {
          return messagingStore.getMessagesSent
        })
    } else {
      return messagesSent
    }
  }

  async loadAddressBook () : Promise<void> {
    return this.apiMessagingService.getAddressBookFromApi()
      .then((addressBook) => {
        messagingStore.loadAddressBook(addressBook)
      })
  }

  loadMessagesReceived () : Promise<void> {
    return this.apiMessagingService.getMessagesReceivedListFromApi()
      .then((messagesReceived) => {
        messagingStore.loadMessagesReceived(messagesReceived)
      })
  }

  loadMessagesSent () : Promise<void> {
    return this.apiMessagingService.getMessagesSentListFromApi()
      .then((messagesSent) => {
        messagingStore.loadMessagesSent(messagesSent)
      })
  }

  loadMessageTemplates () : Promise<void> {
    return this.apiMessagingService.getMessageTemplatesListFromApi()
      .then((templates) => {
        messagingStore.loadMessageTemplates(templates)
      })
  }

  async addToMessageTemplates (messageTemplate: ISmsMessageTemplate) : Promise<void> {
    // TODO: Add some notification to this.
    const existingMessageTemplates = await this.getMessageTemplates()
    const isMessageTemplateDuplicate = existingMessageTemplates.find((templates) => {
      return templates.text === messageTemplate.text || templates.value === messageTemplate.value || templates.id === messageTemplate.id
    })
    if (!isMessageTemplateDuplicate) {
      // do the API call here THEN do the store addition
      await this.apiMessagingService.addMessageTemplatesByApi(messageTemplate)
        .then(() => {
          return messagingStore.addMessageTemplate(messageTemplate)
        })
    }
  }

  async updateMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void> {
    return this.apiMessagingService.modifyMessageTemplatesByApi(newMessageTemplate)
  }

  async deleteMessageTemplate (template: ISmsMessageTemplate) : Promise<void> {
    return this.apiMessagingService.deleteMessageTemplateByApi(template)
  }

  async sendMessages (recipients: IMessageSmsPayload[]) : Promise<void> {
    return this.apiMessagingService.sendMessagesByApi(recipients)
  }
}
