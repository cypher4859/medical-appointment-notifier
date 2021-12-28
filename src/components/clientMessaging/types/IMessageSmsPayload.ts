import IBase from './IBase'

export default interface IMessageSmsPayload extends IBase {
  phoneNumber: string
  messageBody: string
}
