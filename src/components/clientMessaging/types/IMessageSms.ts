export default interface IMessageSms {
  id: string // this will correspond with the twilio SID
  phoneNumber: string
  messageTimeStampTime: string
  messageTimeStampDate: string
  messageText: string
}
