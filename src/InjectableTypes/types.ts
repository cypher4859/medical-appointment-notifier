import 'reflect-metadata'

interface IRegistryTypes {
  [name: string]: symbol;
}

const TYPES : IRegistryTypes = {
  IMessagingService: Symbol('IMessagingService'),
  IVuexMessagingService: Symbol('IVuexMessagingService'),
  IApiMessagingService: Symbol('IApiMessagingService'),
  IPatientService: Symbol('IPatientService'),
  IVuexPatientService: Symbol('IVuexPatientService'),
  IApiPatientService: Symbol('IApiPatientService'),
  IAuthenticationService: Symbol('IAuthenticationService'),
  IVuexAuthenticationService: Symbol('IVuexAuthenticationService'),
  IApiAuthenticationService: Symbol('IApiAuthenticationService'),
  IBaseApiService: Symbol('IBaseApiService'),
  IPatientDatabaseService: Symbol('IPatientDatabaseService'),
  IPatientDatabaseOdbcService: Symbol('IPatientDatabaseOdbcService'),
  IPatientDatabaseJconnService: Symbol('IPatientDatabaseJconnService')
}

export default TYPES
