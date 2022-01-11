import store from '@/store'
import { cloneDeep, template } from 'lodash'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import type IClientContactWithAppointment from '../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../types/IMessageSmsDetails'
import type ISmsMessageTemplate from '../types/ISmsMessageTemplate'

@Module({ dynamic: true, store: store, name: 'MessagingStore' })
export default class MessagingStore extends VuexModule {
  private _addressBook: IClientContactWithAppointment[] = []
  private _messagesReceived: IMessageSmsDetails[] = []
  private _messagesSent: IMessageSmsDetails[] = []
  private _messageTemplates: ISmsMessageTemplate[] = []
  private _messageTemplateKeywords: string[] = []

  get getAddressBook () : IClientContactWithAppointment[] {
    return this._addressBook
  }

  get getMessagesReceived () : IMessageSmsDetails[] {
    return this._messagesReceived
  }

  get getMessagesSent () : IMessageSmsDetails[] {
    return this._messagesSent
  }

  get getMessageTemplates () : ISmsMessageTemplate[] {
    return this._messageTemplates
  }

  get getMessageTemplateKeywords () : string[] {
    return this._messageTemplateKeywords
  }

  @Action({ commit: 'addMessageTemplateToStore' })
  addMessageTemplate (template: ISmsMessageTemplate) {
    return template
  }

  @Action({ commit: 'modifyMessageTemplateInStore' })
  modifyMessageTemplate (newTemplate: ISmsMessageTemplate) {
    return newTemplate
  }

  @Action({ commit: 'loadAddressBookIntoStore' })
  loadAddressBook (addressBook: IClientContactWithAppointment[]) {
    return addressBook
  }

  @Action({ commit: 'loadMessagesReceivedIntoStore' })
  loadMessagesReceived (messagesReceived: IMessageSmsDetails[]) {
    return messagesReceived
  }

  @Action({ commit: 'loadMessagesSentIntoStore' })
  loadMessagesSent (messagesSent: IMessageSmsDetails[]) {
    return messagesSent
  }

  @Action({ commit: 'loadMessageTemplatesIntoStore' })
  loadMessageTemplates (messagesTemplates: ISmsMessageTemplate[]) {
    return messagesTemplates
  }

  @Action({ commit: 'loadMessageTemplateKeywordsIntoStore' })
  loadMessageTemplateKeywords (messagesTemplateKeywords: string[]) {
    return messagesTemplateKeywords
  }

  @Action({ commit: 'clearMessagesInStore' })
  clearStore () {
    return undefined
  }

  @Mutation
  clearMessagesInStore () {
    this._messagesReceived = []
    this._addressBook = []
    this._messagesSent = []
    this._messageTemplates = []
  }

  @Mutation
  addMessageTemplateToStore (messageTemplate: ISmsMessageTemplate) {
    this._messageTemplates.push(messageTemplate)
  }

  @Mutation
  modifyMessageTemplateInStore (newMessageTemplate: ISmsMessageTemplate) {
    (this._messageTemplates as any)[newMessageTemplate.id] = cloneDeep(newMessageTemplate)
  }

  @Mutation
  loadAddressBookIntoStore (addressBook: IClientContactWithAppointment[]) {
    this._addressBook = cloneDeep(addressBook)
  }

  @Mutation
  loadMessagesSentIntoStore (messagesSent: IMessageSmsDetails[]) {
    this._messagesSent = cloneDeep(messagesSent)
  }

  @Mutation
  loadMessagesReceivedIntoStore (messagesReceived: IMessageSmsDetails[]) {
    this._messagesReceived = cloneDeep(messagesReceived)
  }

  @Mutation
  loadMessageTemplatesIntoStore (templates: ISmsMessageTemplate[]) {
    this._messageTemplates = cloneDeep(templates)
  }

  @Mutation
  loadMessageTemplateKeywordsIntoStore (keywords: string[]) {
    this._messageTemplateKeywords = cloneDeep(keywords)
  }
}
