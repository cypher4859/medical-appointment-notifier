import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import type IMessagingService from '@/components/clientMessaging/services/IMessagingService'
import AppointmentModes from '@/components/clientMessaging/services/AppointmentModes'
import IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import IMessageSmsDetails from '../../types/IMessageSmsDetails'

const patientDataMockData = require('@/assets/MockPatientData.json')
const mockMessagesReceived = require('@/assets/MockMessagesReceived.json') as IMessageSmsDetails[]
const mockMessagesSent = require('@/assets/MockMessagesSent.json') as IMessageSmsDetails[]

@injectable()
export default class MessagingService extends Vue implements IMessagingService {
  getMessageTemplates () : ISmsMessageTemplate[] {
    return [
      {
        value: null, text: 'Please Select You Message Template'
      },
      {
        value: 'You have an appointment at "TIME" on "DATE"', text: 'Default - You have an appointment'
      },
      {
        value: 'Happy Halloween! Get your vaccines before Trick Or Treat!', text: 'Happy Halloween!'
      },
      {
        value: 'Get Prepared for the Holiday Spirit!', text: 'Merry Christmas!'
      }
    ] as ISmsMessageTemplate[]
  }

  getRecipientModes () : ISmsMessageTemplate[] {
    return [
      { value: null, text: 'Please select recipient loading mode' },
      { value: AppointmentModes.BY_APPOINTMENT, text: 'By Appointment Date' },
      { value: AppointmentModes.SINGLE_CONTACT, text: 'Single Contact' },
      { value: AppointmentModes.MULTIPLE_CONTACTS, text: 'Multiple Contacts' }
    ]
  }

  getAddressBook () : IClientContactWithAppointment[] {
    // we should instead use a different service to manage this
    // this.patientService.getAddressBookOfPatients() or something
    return patientDataMockData
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
    let messageList: any[] = []
    Promise.resolve()
      .then(() => {
        messageList = mockMessagesReceived
      })
    return messageList
  }

  getMessagesSentList () : IMessageSmsDetails[] {
    let messageList: any[] = []
    Promise.resolve()
      .then(() => {
        messageList = mockMessagesSent
      })
    return messageList
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
}
