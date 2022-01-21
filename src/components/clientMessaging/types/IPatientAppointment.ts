export default interface IPatientAppointment {
  providerName: string,
  date: string,
  time: string,
  dateTime: string,
  patient?: string,
  visitType?: string,
  appointmentId: string
}
