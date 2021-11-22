import IClient from './IClient'

export default interface IClientRecipient extends IClient {
  phoneNumber?: string
  email?: string
  mailingAddres?: string
}
