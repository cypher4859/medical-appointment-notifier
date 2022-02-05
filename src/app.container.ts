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
import type IAuthenticationService from './components/clientMessaging/services/IAuthenticationService'
import AuthenticationService from './components/clientMessaging/services/impl/AuthenticationService'
import BaseApiService from './components/clientMessaging/services/impl/BaseApiService'
import type IBaseApiService from './components/clientMessaging/services/IBaseApiService'
import type IVuexAuthenticationService from './components/clientMessaging/services/IVuexAuthenticationService'
import VuexAuthenticationService from './components/clientMessaging/services/impl/VuexAuthenticationService'
import type IApiAuthenticationService from './components/clientMessaging/services/IApiAuthenticationService'
import ApiAuthenticationService from './components/clientMessaging/services/impl/ApiAuthenticationService'
import IPatientDatabaseOdbcService from './components/clientMessaging/services/IPatientDatabaseOdbcService'
import PatientDatabaseOdbcService from './components/clientMessaging/services/impl/PatientDatabaseOdbcService'
import IPatientDatabaseJconnService from './components/clientMessaging/services/IPatientDatabaseJconnService'
import PatientDatabaseJconnService from './components/clientMessaging/services/impl/PatientDatabaseJconnService'
import IPatientDatabaseService from './components/clientMessaging/services/IPatientDatabaseService'
import PatientDatabaseService from './components/clientMessaging/services/impl/PatientDatabaseService'

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
  container.bind<IAuthenticationService>(TYPES.IAuthenticationService).to(AuthenticationService)
  container.bind<IVuexAuthenticationService>(TYPES.IVuexAuthenticationService).to(VuexAuthenticationService)
  container.bind<IApiAuthenticationService>(TYPES.IApiAuthenticationService).to(ApiAuthenticationService)
  container.bind<IBaseApiService>(TYPES.IBaseApiService).to(BaseApiService)
  container.bind<IPatientDatabaseService>(TYPES.IPatientDatabaseService).to(PatientDatabaseService)
  container.bind<IPatientDatabaseOdbcService>(TYPES.IPatientDatabaseOdbcService).to(PatientDatabaseOdbcService)
  container.bind<IPatientDatabaseJconnService>(TYPES.IPatientDatabaseJconnService).to(PatientDatabaseJconnService)
}
