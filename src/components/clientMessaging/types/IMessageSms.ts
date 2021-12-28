// export default interface IMessageSms {
//   id: string // this will correspond with the twilio SID
//   phoneNumber: string
//   messageTimeStampTime: string
//   messageTimeStampDate: string
//   messageText: string
// }

export default interface IMessageSms {
  accountSid: string
  apiVersion: string
  body: string
  dateCreated: string
  dateSent: string
  dateUpdated: string
  direction: string
  errorCode: string
  errorMessage: string
  from: string
  messagingServiceId: string
  numMedia: string
  numSegments: string
  price: string
  priceUnit: string
  sid: string
  status: string
  to: string
  uri: string
}
