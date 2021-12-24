import TYPES from '@/InjectableTypes/types'
import { inject } from 'inversify'
import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import axios from 'axios'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IMessageSmsDetails from '../../types/IMessageSmsDetails'
import type ISmsMessageTemplate from '../../types/ISmsMessageTemplate'
import type IApiMessagingService from '../IApiMessagingService'
import type IPatientService from '../IPatientService'

@injectable()
export default class ApiMessagingService extends Vue implements IApiMessagingService {
  private baseUrl: string = process.env.APPOINTMENT_NOTIFIER_BASE_URL ? process.env.APPOINTMENT_NOTIFIER_BASE_URL : 'http://localhost:3000'
  private smsMessageUri: string = '/messaging/sms'
  private api = axios.create({
    baseURL: this.baseUrl,
    timeout: 15000
  })

  @inject(TYPES.IPatientService)
  private patientService!: IPatientService

  getAddressBookFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve(this.patientService.getListOfPatients())
  }

  async getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return this.api.get(`${this.smsMessageUri}/message-received-list`)
          .then((res) => {
            return res.data as IMessageSmsDetails[]
          })
      })
  }

  async getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]> {
    return Promise.resolve()
      .then(() => {
        return this.api.get(`${this.smsMessageUri}/message-templates-list`)
          .then((res) => {
            return res.data as ISmsMessageTemplate[]
          })
      })
  }

  async getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return this.api.get(`${this.smsMessageUri}/message-sent-list`)
          .then((res) => {
            return res.data as IMessageSmsDetails[]
          })
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
