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
import { camelCase } from 'lodash'
import type IMessageSmsPayload from '../../types/IMessageSmsPayload'
import BaseApiService from './BaseApiService'
import type IAuthenticationService from '../IAuthenticationService'

@injectable()
export default class ApiMessagingService extends BaseApiService implements IApiMessagingService {
  @inject(TYPES.IPatientService)
  private patientService!: IPatientService

  @inject(TYPES.IAuthenticationService)
  private authenticationService!: IAuthenticationService

  private mapTwilioMessageProperties (message: object) : IMessageSmsDetails {
    const cleanedMessage = {} as any
    Object.keys(message).forEach((property) => {
      cleanedMessage[camelCase(property)] = (message as any)[property]
    })
    return cleanedMessage as IMessageSmsDetails
  }

  getAddressBookFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.patientService.getListOfPatients()
          })
      })
  }

  async getMessagesReceivedListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.get(`${this.smsMessageUri}/message-received-list`)
              .then((res) => {
                return res.data as IMessageSmsDetails[]
              })
              .then((messages) => {
                messages.forEach((message) => {
                  message.to = message.to.replace(/\s/g, '')
                  message.from = message.to.replace(/\s/g, '')
                })
                return messages
              })
              .then((messages) => {
                return messages.map((message) => {
                  return this.mapTwilioMessageProperties(message)
                })
              })
          })
      })
  }

  async getMessageTemplatesListFromApi () : Promise<ISmsMessageTemplate[]> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.get(`${this.smsMessageUri}/message-templates-list`)
              .then((res) => {
                return res.data as ISmsMessageTemplate[]
              })
          })
      })
  }

  async getMessagesSentListFromApi () : Promise<IMessageSmsDetails[]> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.get(`${this.smsMessageUri}/message-sent-list`)
              .then((res) => {
                return res.data as IMessageSmsDetails[]
              })
              .then((messages) => {
                messages.forEach((message) => {
                  message.to = message.to.replace(/\s/g, '')
                  message.from = message.to.replace(/\s/g, '')
                })
                return messages
              })
              .then((messages) => {
                return messages.map((message) => {
                  return this.mapTwilioMessageProperties(message)
                })
              })
          })
      })
  }

  async addMessageTemplatesByApi (newMessageTemplate: ISmsMessageTemplate) : Promise<void> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.post(`${this.smsMessageUri}/message-templates-add`, newMessageTemplate)
          })
      })
  }

  async modifyMessageTemplatesByApi (template: ISmsMessageTemplate) : Promise<void> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.put(`${this.smsMessageUri}/message-templates-modify`, template)
          })
      })
  }

  async deleteMessageTemplateByApi (template: ISmsMessageTemplate) : Promise<void> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.post(`${this.smsMessageUri}/message-templates-delete`, template)
          })
      })
  }

  async sendMessagesByApi (recipients: IMessageSmsPayload[]) : Promise<void> {
    return Promise.resolve()
      .then(() => {
        return this.authenticationService.getApiKey()
          .then((key) => {
            return this.setApiKeyHeader(key)
          })
          .then(() => {
            return this.api.post(`${this.smsMessageUri}/message-send-to-recipients`, recipients)
          })
      })
  }

  async setApiKey (key: string) : Promise<void> {
    return this.setApiKeyHeader(key)
  }
}
