import 'reflect-metadata'

interface IRegistryTypes {
  [name: string]: symbol;
}

const TYPES : IRegistryTypes = {
  IMessagingService: Symbol('IMessagingService')
}

export default TYPES
