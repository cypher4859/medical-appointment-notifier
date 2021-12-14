import 'reflect-metadata'
import { container } from 'inversify-props'
import IMessagingService from './components/clientMessaging/services/IMessagingService'
import MessagingService from './components/clientMessaging/services/impl/MessagingService'
import TYPES from './InjectableTypes/types'

export default function registerContainerServices () {
  container.options.skipBaseClassChecks = true
  // probably could use the TYPES here
  // container.bind<ISomeNewService>('ISomeNewService').to(SomeNewService)
  container.bind<IMessagingService>(TYPES.IMessagingService).to(MessagingService)
}
