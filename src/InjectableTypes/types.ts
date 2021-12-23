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
  IApiPatientService: Symbol('IApiPatientService')
}

export default TYPES
