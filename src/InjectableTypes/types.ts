import 'reflect-metadata'

interface IRegistryTypes {
  [name: string]: symbol;
}

const TYPES : IRegistryTypes = {
  IMessagingService: Symbol('IMessagingService'),
  IPatientService: Symbol('IPatientService')
}

export default TYPES
