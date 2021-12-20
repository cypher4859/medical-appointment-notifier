import AppointmentStatus from '@/components/clientMessaging/services/AppointmentStatus'

export default interface IAppointment {
  appointmentDate?: string
  appointmentTime?: string
  appointmentStatusResponse?: AppointmentStatus
  _patientId?: string
}
