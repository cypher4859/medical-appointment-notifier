import 'reflect-metadata'
import { container } from 'inversify-props'
import type IMessagingService from './components/clientMessaging/services/IMessagingService'
import MessagingService from './components/clientMessaging/services/impl/MessagingService'
import TYPES from './InjectableTypes/types'
import type IPatientService from './components/clientMessaging/services/IPatientService'
import PatientService from './components/clientMessaging/services/impl/PatientService'
import type IVuexPatientService from './components/clientMessaging/services/IVuexPatientService'
import VuexPatientService from './components/clientMessaging/services/impl/VuexPatientService'
import type IApiPatientService from './components/clientMessaging/services/IApiPatientService'
import ApiPatientService from './components/clientMessaging/services/impl/ApiPatientService'
import type IVuexMessagingService from './components/clientMessaging/services/IVuexMessagingService'
import VuexMessagingService from './components/clientMessaging/services/impl/VuexMessagingService'
import ApiMessagingService from './components/clientMessaging/services/impl/ApiMessagingService'
import type IApiMessagingService from './components/clientMessaging/services/IApiMessagingService'

export default function registerContainerServices () {
  container.options.skipBaseClassChecks = true
  // probably could use the TYPES here
  // container.bind<ISomeNewService>('ISomeNewService').to(SomeNewService)
  container.bind<IMessagingService>(TYPES.IMessagingService).to(MessagingService)
  container.bind<IVuexMessagingService>(TYPES.IVuexMessagingService).to(VuexMessagingService)
  container.bind<IApiMessagingService>(TYPES.IApiMessagingService).to(ApiMessagingService)
  container.bind<IPatientService>(TYPES.IPatientService).to(PatientService)
  container.bind<IVuexPatientService>(TYPES.IVuexPatientService).to(VuexPatientService)
  container.bind<IApiPatientService>(TYPES.IApiPatientService).to(ApiPatientService)
}
