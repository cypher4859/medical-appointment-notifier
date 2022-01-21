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
import IPatient from '../../types/IPatient'
import { v4 as uuidv4, v4 } from 'uuid'
import IPatientBasicInfo from '../../types/IPatientBasicInfo'

@injectable()
export default class ApiPatientService extends Vue implements IApiPatientService {
  @inject(TYPES.IPatientDatabaseOdbcService)
  private patientDatabaseOdbcService!: IPatientDatabaseOdbcService

  @inject(TYPES.IPatientDatabaseJconnService)
  private patientDatabaseJconnService!: IPatientDatabaseJconnService

  // This needs to be setup before use
  private environment: string = PatientDatabaseEnvironments.ADVANTAGE_ODBC

  async getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return this.getDatabaseEnvironmentService()
      })
      .then((patientDatabaseService: IPatientDatabaseJconnService|IPatientDatabaseOdbcService|undefined) => {
        if (patientDatabaseService) {
          return patientDatabaseService.getListOfPatients()
        } else {
          console.error('Error! The configured patient database API Service does not exist!')
          return []
        }
      })
      .then((listOfPatients: IPatient[]) => {
        if (listOfPatients.length) {
          return this.mapPatientToClientProperties(listOfPatients)
        } else {
          console.error('No patients have been loaded into the application. Please confirm that this application can communicate with the patient database API Service')
          return [] as IClientContactWithAppointment[]
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

  private async mapPatientToClientProperties (patientData: IPatient[]) : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return patientData.map((patient) => {
          // console.log('Patient in particular: ', patient)
          return {
            id: uuidv4(),
            fullName: patient.fullname,
            firstName: patient.firstname,
            lastName: patient.lastname,
            email: patient.email,
            dateOfBirth: patient.birthdate,
            mailingAddress: patient.address1,
            phoneNumber: patient.phoneCell,
            appointmentList: [],
            nextAppointment: {
              appointmentDate: patient.date ? patient.date : '',
              appointmentTime: patient.time ? patient.time : '',
              appointmentStatusResponse: AppointmentStatus.UNKNOWN,
              _patientId: patient.code
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

export function getBasicPatient () : IPatient {
  const patient: IPatient = {
    code: '',
    client: '',
    fullname: '',
    firstname: '',
    middle: '',
    lastname: '',
    address1: '',
    address2: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    inactive: false,
    phoneCell: '',
    phoneHome: '',
    provider: '',
    birthdate: '',
    firstDate: '',
    lastDate: '',
    providerName: '',
    date: '',
    time: '',
    dateTime: '',
    patient: '',
    visitType: '',
    appointmentId: ''
  }

  return patient
}
