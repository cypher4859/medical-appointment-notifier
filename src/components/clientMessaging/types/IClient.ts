import IBase from './IBase'

export default interface IClient extends IBase {
  fullName: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}
