import AppointmentStatus from '@/components/clientMessaging/services/AppointmentStatus'

export default interface IAppointment {
  appointmentDateTime?: string
  appointmentTime?: string
  appointmentStatusResponse?: AppointmentStatus
}
