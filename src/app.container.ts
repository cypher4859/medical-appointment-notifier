import 'reflect-metadata'
import { container } from 'inversify-props'

export default function registerContainerServices () {
  container.options.skipBaseClassChecks = true
  // probably could use the TYPES here
  // container.bind<ISomeNewService>('ISomeNewService').to(SomeNewService)
}
