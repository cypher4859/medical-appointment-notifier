import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IApiPatientService from '@/components/clientMessaging/services/IApiPatientService'
import { map } from 'lodash'
import AppointmentStatus from '../AppointmentStatus'
import axios from 'axios'
import PatientDatabaseEnvironments from '../PatientDatabaseEnvironments'
import { inject } from 'inversify'
import TYPES from '@/InjectableTypes/types'
import type IPatientDatabaseOdbcService from '../IPatientDatabaseOdbcService'
import type IPatientDatabaseJconnService from '../IPatientDatabaseJconnService'

@injectable()
export default class ApiPatientService extends Vue implements IApiPatientService {
  @inject(TYPES.IPatientDatabaseOdbcService)
  private patientDatabaseOdbcService!: IPatientDatabaseOdbcService

  @inject(TYPES.IPatientDatabaseJconnService)
  private patientDatabaseJconnService!: IPatientDatabaseJconnService

  private environment: string = ''

  async getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return this.getDatabaseEnvironmentService()
      })
      .then((patientDatabaseService: IPatientDatabaseJconnService|IPatientDatabaseOdbcService|undefined) => {
        if (patientDatabaseService) {
          return patientDatabaseService.getListOfPatients()
        } else {
          return []
        }
      })
  }

  private getDatabaseEnvironmentService () : IPatientDatabaseOdbcService|IPatientDatabaseJconnService|undefined {
    if (this.environment === PatientDatabaseEnvironments.ADVANTAGE_ODBC) {
      return this.patientDatabaseOdbcService
    } else if (this.environment === PatientDatabaseEnvironments.ADVANTAGE_JCONN) {
      return this.patientDatabaseJconnService
    } else {
      return undefined
    }
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
