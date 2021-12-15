import type IMessagingService from '@/components/clientMessaging/services/IMessagingService'
import type IPatientService from '@/components/clientMessaging/services/IPatientService'
import TYPES from '@/InjectableTypes/types'
import { inject } from 'inversify-props'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ServiceMixin extends Vue {
  @inject(TYPES.IMessagingService)
  protected messagingService!: IMessagingService

  @inject(TYPES.IPatientService)
  protected patientService!: IPatientService
}
