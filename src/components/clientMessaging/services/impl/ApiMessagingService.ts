import TYPES from '@/InjectableTypes/types'
import { inject } from 'inversify'
import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../../types/IMessageSmsDetails'
import type ISmsMessageTemplate from '../../types/ISmsMessageTemplate'
import type IApiMessagingService from '../IApiMessagingService'
import type IPatientService from '../IPatientService'

const mockMessagesReceived = require('@/assets/MockMessagesReceived.json') as IMessageSmsDetails[]
const mockMessagesSent = require('@/assets/MockMessagesSent.json') as IMessageSmsDetails[]

@injectable()
export default class ApiMessagingService extends Vue implements IApiMessagingService {
  @inject(TYPES.IPatientService)
  private patientService!: IPatientService

  getAddressBookFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve(this.patientService.getListOfPatients())
  }

  getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return mockMessagesReceived
      })
  }

  getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]> {
    return Promise.resolve()
      .then(() => {
        return [
          {
            id: '397092ca-e7a2-48e9-b808-cb9badd5ab22', value: null, text: 'Please Select A Message Template'
          },
          {
            id: '8369f97e-b96c-40f7-92ab-3bd5f4948a60', value: 'You have an appointment at %APPT_TIME% on %APPT_DATE%', text: 'Default - You have an appointment'
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

  getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return mockMessagesSent
      })
  }

  addMessageTemplatesByApi () : Promise<void> {
    return Promise.resolve()
      .then(() => {
        console.log('TODO: Add message template via api')
      })
  }

  sendMessagesByApi () : Promise<void> {
    return Promise.resolve()
      .then(() => {
        console.log('Sending message')
      })
  }
}
