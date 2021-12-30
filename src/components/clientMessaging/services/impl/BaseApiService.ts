import axios from 'axios'
import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import IBaseApiService from '../IBaseApiService'

@injectable()
export default class BaseApiService extends Vue implements IBaseApiService {
  protected baseUrl: string = process.env.APPOINTMENT_NOTIFIER_BASE_URL ? process.env.APPOINTMENT_NOTIFIER_BASE_URL : 'http://localhost:3000'
  protected smsMessageUri: string = '/messaging/sms'
  protected authenticationUri: string = '/messaging/account/api'
  protected mapKey: string = 'medical-notifier-api-key'
  protected apiKeyHeader = {}

  get api () {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 15000,
      headers: this.apiKeyHeader
    })
  }

  protected setApiKeyHeader (apiKey: string) : void {
    (this.apiKeyHeader as any)[this.mapKey] = apiKey
  }
}
