import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IApiPatientService from '@/components/clientMessaging/services/IApiPatientService'
import { map } from 'lodash'
import AppointmentStatus from '../AppointmentStatus'
import axios from 'axios'

const patientDataMockData = require('@/assets/MockPatientData.json')

@injectable()
export default class ApiPatientService extends Vue implements IApiPatientService {
  private baseUrl: string = ' https://my.api.mockaroo.com/'
  private patientUri: string = 'mock-patient-data.json'
  private apiHeaders: any = { 'X-API-Key': 'cf7bbbd0' }

  private api = axios.create({
    baseURL: this.baseUrl,
    timeout: 13000,
    headers: this.apiHeaders
  })

  async getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return this.api.get(this.patientUri, this.apiHeaders)
          .then((res) => {
            return res.data as IClientContactWithAppointment[]
          })
      })
      // .then((patientData) => {
      //   // preprocess patient data
      //   return this.mapPropertiesToPatientData(patientData)
      // })
  }

  private async mapPropertiesToPatientData (patientData: any[]) : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return patientData.map((patient) => {
          return {
            id: patient.id,
            fullName: patient.fullName,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            dateOfBirth: patient.dateOfBirth,
            mailingAddress: patient.mailingAddress,
            phoneNumber: patient.phoneNumber,
            appointmentList: [],
            nextAppointment: {
              appointmentDate: patient.appointmentDate ? patient.appointmentDate : '',
              appointmentTime: patient.appointmentTime ? patient.appointmentTime : '',
              appointmentStatusResponse: AppointmentStatus.UNKNOWN,
              _patientId: ''
            }
          } as IClientContactWithAppointment
        })
      })
      .then((mappedPatientData) => {
        mappedPatientData.forEach((patient) => {
          if (patient.nextAppointment) {
            patient.appointmentList.push(patient.nextAppointment)
          }
        })
        return mappedPatientData
      })
  }
}
