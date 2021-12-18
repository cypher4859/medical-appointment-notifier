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

const mockMessagesReceived = require('@/assets/MockMessagesReceived.json') as IMessageSmsDetails[]
const mockMessagesSent = require('@/assets/MockMessagesSent.json') as IMessageSmsDetails[]

@injectable()
export default class MessagingService extends Vue implements IMessagingService {
  @inject(TYPES.IPatientService)
  protected patientService!: IPatientService

  private _addressBook: IClientContactWithAppointment[] = []
  private _messagesReceived: IMessageSmsDetails[] = []
  private _messagesSent: IMessageSmsDetails[] = []
  private _messageTemplates: ISmsMessageTemplate[] = []

  getMessageTemplates () : ISmsMessageTemplate[] {
    if (!this._messageTemplates.length) {
      this.loadMessageTemplates()
      return this._messageTemplates
    } else {
      return this._messageTemplates
    }
  }

  getRecipientModes () : object[] {
    return [
      { value: null, text: 'Please select recipient loading mode' },
      { value: AppointmentModes.BY_APPOINTMENT, text: 'By Appointment Date' },
      { value: AppointmentModes.SINGLE_CONTACT, text: 'Single Contact' },
      { value: AppointmentModes.MULTIPLE_CONTACTS, text: 'Multiple Contacts' }
    ]
  }

  getAddressBook () : IClientContactWithAppointment[] {
    if (!this._addressBook.length) {
      this.loadAddressBook()
      return this._addressBook
    } else {
      return this._addressBook
    }
  }

  getAddressBookTableHeaders () : object[] {
    return [
      { key: 'fullName', sortable: true, label: 'Name' },
      { key: 'dateOfBirth', sortable: false, label: 'Date of Birth' },
      { key: 'phoneNumber', sortable: false, label: 'Phone Number' },
      { key: 'appointmentTime', sortable: false, label: 'Appointment Time' },
      { key: 'appointmentDateTime', sortable: false, label: 'Appointment Date' }
    ]
  }

  async sendMessages () : Promise<void> {
    return Promise.resolve()
      .then(() => {
        console.log('Sending message')
      })
  }

  getMessagesReceivedList () : IMessageSmsDetails[] {
    if (!this._messagesReceived.length) {
      this.loadMessagesReceived()
      return this._messagesReceived
    } else {
      return this._messagesReceived
    }
  }

  getMessagesSentList () : IMessageSmsDetails[] {
    if (!this._messagesSent.length) {
      this.loadMessagesSent()
      return this._messagesSent
    } else {
      return this._messagesSent
    }
  }

  getMessageDetailsTableFields () : string[] {
    return [
      'messageTimeStampDate',
      'messageTimeStampTime',
      'phoneNumber',
      'fullName',
      'messageText',
      'appointmentStatusResponse'
    ]
  }

  private async getAddressBookFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve(await this.patientService.getListOfPatients())
  }

  private async getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return mockMessagesReceived
      })
  }

  private async getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]> {
    return Promise.resolve()
      .then(() => {
        return [
          {
            id: '397092ca-e7a2-48e9-b808-cb9badd5ab22', value: null, text: 'Please Select You Message Template'
          },
          {
            id: '8369f97e-b96c-40f7-92ab-3bd5f4948a60', value: 'You have an appointment at "TIME" on "DATE"', text: 'Default - You have an appointment'
          },
          {
            id: '4f012025-dfbb-44e5-ac69-e12e8c0a00ec', value: 'Happy Halloween! Get your vaccines before Trick Or Treat!', text: 'Happy Halloween!'
          },
          {
            id: '30c6fd1e-a78c-40a5-a8b5-fef47b694b7e', value: 'Get Prepared for the Holiday Spirit!', text: 'Merry Christmas!'
          }
        ] as ISmsMessageTemplate[]
      })
  }

  private async getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return mockMessagesSent
      })
  }

  private async sendMessagesByApi () : Promise<void> {
    return Promise.resolve()
      .then(() => {
        console.log('Sending message')
      })
  }

  async loadAddressBook () : Promise<void> {
    this._addressBook = await this.getAddressBookFromApi()
  }

  async loadMessagesReceived () : Promise<void> {
    this._messagesReceived = await this.getMessagesReceivedListFromApi()
  }

  async loadMessagesSent () : Promise<void> {
    this._messagesSent = await this.getMessagesSentListFromApi()
  }

  async loadMessageTemplates () : Promise<void> {
    this._messageTemplates = await this.getMessageTemplatesListFromApi()
  }
}
