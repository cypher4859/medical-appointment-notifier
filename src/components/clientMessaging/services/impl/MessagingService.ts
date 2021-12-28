import { inject, injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import type ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import type IMessagingService from '@/components/clientMessaging/services/IMessagingService'
import AppointmentModes from '@/components/clientMessaging/services/AppointmentModes'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../../types/IMessageSmsDetails'
import TYPES from '@/InjectableTypes/types'
import type IPatientService from '../IPatientService'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash'
import type IVuexMessagingService from '../IVuexMessagingService'
import IMessageSmsPayload from '../../types/IMessageSmsPayload'

enum MessagingTemplateKeywords {
  APPT_TIME='appointmentTime',
  APPT_DATE='appointmentDate',
  OFFICE_PHONE='',
  OFFICE_EMAIL='',
  TREATING_PHYSICIAN=''
}

@injectable()
export default class MessagingService extends Vue implements IMessagingService {
  @inject(TYPES.IPatientService)
  protected patientService!: IPatientService

  @inject(TYPES.IVuexMessagingService)
  protected vuexMessagingService!: IVuexMessagingService

  async getMessageTemplates () : Promise<ISmsMessageTemplate[]> {
    return this.vuexMessagingService.getMessageTemplates()
  }

  getRecipientModes () : object[] {
    return [
      { value: null, text: 'Please select recipient loading mode' },
      { value: AppointmentModes.BY_APPOINTMENT, text: 'By Appointment Date' },
      { value: AppointmentModes.SINGLE_CONTACT, text: 'Single Contact' },
      { value: AppointmentModes.MULTIPLE_CONTACTS, text: 'Multiple Contacts' }
    ]
  }

  async getAddressBook () : Promise<IClientContactWithAppointment[]> {
    return this.vuexMessagingService.getAddressBook()
  }

  getAddressBookTableHeaders () : object[] {
    return [
      { key: 'fullName', sortable: true, label: 'Name' },
      { key: 'dateOfBirth', sortable: false, label: 'Date of Birth' },
      { key: 'phoneNumber', sortable: false, label: 'Phone Number' },
      { key: 'appointmentTime', sortable: false, label: 'Appointment Time' },
      { key: 'appointmentDate', sortable: false, label: 'Appointment Date' }
    ]
  }

  async sendMessages (recipients: IMessageSmsPayload[]) : Promise<void> {
    return this.vuexMessagingService.sendMessages(recipients)
  }

  compileMessages (recipients: IClientContactWithAppointment[], messageTemplate: string) : IMessageSmsPayload[] {
    // make a new interface
    const payload: IMessageSmsPayload[] = []
    recipients.forEach((recipient) => {
      const tempPayload: IMessageSmsPayload = {
        id: uuidv4(),
        apiKey: recipient.apiKey,
        phoneNumber: recipient.phoneNumber as string,
        messageBody: this.getMessageTransformedKeyword(messageTemplate, recipient)
      }
      payload.push(tempPayload)
    })
    return payload
  }

  async getMessagesReceivedList () : Promise<IMessageSmsDetails[]> {
    return this.vuexMessagingService.getMessagesReceivedList()
  }

  async getMessagesSentList () : Promise<IMessageSmsDetails[]> {
    return this.vuexMessagingService.getMessagesSentList()
  }

  getMessageDetailsTableFields () : string[] {
    return [
      'dateSent',
      'from',
      'fullName',
      'body',
      'appointmentStatusResponse'
    ]
  }

  getDefaultMessagingTemplate () : ISmsMessageTemplate {
    // Generate an ID
    const defaultTemplate = {
      id: 'MT' + uuidv4(),
      text: 'Default Template Name - Change me!',
      value: 'Default Template Definition - Change me!'
    }
    this.vuexMessagingService.addToMessageTemplates(defaultTemplate)
    return defaultTemplate
    // Add the default template with ID to the store
    // on submit then add it to the API
  }

  getMessageTransformedKeyword (message: string, recipient: IClientContactWithAppointment) : string {
    this.getMessageTemplateKeywords().forEach((keyword) => {
      if (message.includes(keyword)) {
        const clientPropertyAccessor = MessagingTemplateKeywords[keyword as keyof typeof MessagingTemplateKeywords]
        const clientProperty = recipient[clientPropertyAccessor as unknown as keyof IClientContactWithAppointment]?.toString()
        message = message.replaceAll(`%${keyword}%`, clientProperty as string)
      }
    })
    return message
  }

  getMessageTransformedKeywordFromTemplate (message: ISmsMessageTemplate, patient: IClientContactWithAppointment) : ISmsMessageTemplate {
    let transformedMessage: ISmsMessageTemplate = cloneDeep(message)
    this.getMessageTemplateKeywords().forEach((keyword) => {
      if (message.value?.includes(keyword)) {
        const clientPropertyAccessor = MessagingTemplateKeywords[keyword as keyof typeof MessagingTemplateKeywords]
        const clientProperty = patient[clientPropertyAccessor as unknown as keyof IClientContactWithAppointment]?.toString()
        transformedMessage.value = transformedMessage.value?.replaceAll(`%${keyword}%`, clientProperty as string)
      }
    })
    return transformedMessage
  }

  async getExamplePatient () : Promise<IClientContactWithAppointment> {
    return this.getAddressBook()
      .then((addressBook) => {
        return addressBook[0]
      })
  }

  getMessageTemplateKeywords () : string[] {
    // This should match the valid options in the enum
    return [
      'APPT_TIME',
      'APPT_DATE',
      'OFFICE_PHONE',
      'OFFICE_EMAIL',
      'TREATING_PHYSICIAN'
    ]
  }

  async loadAddressBook () : Promise<void> {
    return this.vuexMessagingService.loadAddressBook()
  }

  async loadMessagesReceived () : Promise<void> {
    return this.vuexMessagingService.loadMessagesReceived()
  }

  async loadMessagesSent () : Promise<void> {
    return this.vuexMessagingService.loadMessagesSent()
  }

  async loadMessageTemplates () : Promise<void> {
    return this.vuexMessagingService.loadMessageTemplates()
  }

  async addMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void> {
    return this.vuexMessagingService.addToMessageTemplates(newMessageTemplate)
  }

  async updateMessageTemplate (newMessageTemplate: ISmsMessageTemplate) : Promise<void> {
    return this.vuexMessagingService.updateMessageTemplate(newMessageTemplate)
  }

  async deleteMessageTemplate (template: ISmsMessageTemplate) : Promise<void> {
    return this.vuexMessagingService.deleteMessageTemplate(template)
  }
}
