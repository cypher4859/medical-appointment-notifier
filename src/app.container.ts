import 'reflect-metadata'
import { container } from 'inversify-props'
import type IMessagingService from './components/clientMessaging/services/IMessagingService'
import MessagingService from './components/clientMessaging/services/impl/MessagingService'
import TYPES from './InjectableTypes/types'
import type IPatientService from './components/clientMessaging/services/IPatientService'
import PatientService from './components/clientMessaging/services/impl/PatientService'

export default function registerContainerServices () {
  container.options.skipBaseClassChecks = true
  // probably could use the TYPES here
  // container.bind<ISomeNewService>('ISomeNewService').to(SomeNewService)
  container.bind<IMessagingService>(TYPES.IMessagingService).to(MessagingService)
  container.bind<IPatientService>(TYPES.IPatientService).to(PatientService)
}
