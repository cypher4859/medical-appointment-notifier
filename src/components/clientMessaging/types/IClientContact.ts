import IClient from './IClient'

export default interface IClientContact extends IClient {
  phoneNumber?: string
  email?: string
  mailingAddress?: string
}
