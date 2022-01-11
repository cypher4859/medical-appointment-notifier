import type IMessagingService from '@/components/clientMessaging/services/IMessagingService'
import type IPatientService from '@/components/clientMessaging/services/IPatientService'
import type IAuthenticationService from '@/components/clientMessaging/services/IAuthenticationService'
import type IPatientDatabaseOdbcService from '@/components/clientMessaging/services/IPatientDatabaseOdbcService'
import type IPatientDatabaseJconnService from '@/components/clientMessaging/services/IPatientDatabaseJconnService'
import TYPES from '@/InjectableTypes/types'
import { inject } from 'inversify-props'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ServiceMixin extends Vue {
  @inject(TYPES.IMessagingService)
  protected messagingService!: IMessagingService

  @inject(TYPES.IPatientService)
  protected patientService!: IPatientService

  @inject(TYPES.IAuthenticationService)
  protected authenticationService!: IAuthenticationService

  @inject(TYPES.IPatientDatabaseOdbcService)
  protected patientDatabaseOdbcService!: IPatientDatabaseOdbcService

  @inject(TYPES.IPatientDatabaseJconnService)
  protected patientDatabaseJconnService!: IPatientDatabaseJconnService
}
