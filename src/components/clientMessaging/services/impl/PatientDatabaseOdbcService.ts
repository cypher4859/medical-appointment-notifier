import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientDatabaseOdbcService from '../IPatientDatabaseOdbcService'
import axios from 'axios'
// import adt from 'node_adt'
// import oledb from 'oledb-electron'
import odbc from 'odbc'
import IPatientBasicInfo from '../../types/IPatientBasicInfo'
import IPatient from '../../types/IPatient'
import IPatientAppointment from '../../types/IPatientAppointment'
import { assign, property } from 'lodash'

@injectable()
export default class PatientDatabaseOdbcService extends Vue implements IPatientDatabaseOdbcService {
  private baseUrl: string = ' https://my.api.mockaroo.com/'
  private patientUri: string = 'mock-patient-data.json'
  private apiHeaders: any = { 'X-API-Key': 'cf7bbbd0' }

  private api = axios.create({
    baseURL: this.baseUrl,
    timeout: 13000,
    headers: this.apiHeaders
  })

  private get getConnectionString () {
    return 'DSN=test-mariadb-odbc'
  }

  async getListOfPatients () : Promise<IPatient[]> {
    return Promise.resolve()
      .then(() => {
        return this.getAppointmentsFromDatabase()
      })
      .then((appointments) => {
        return this.mapAppointmentToPatient(appointments)
          .then((patientList) => {
            console.log('Total patient list: ', patientList)
            return patientList
          })
      })
  }

  async getPatientsFromDatabase () : Promise<IPatientBasicInfo[]> {
    const dbInstance = await odbc.connect(this.getConnectionString)
    const x = await dbInstance.query('SELECT CODE, CLIENT, FULLNAME, FIRSTNAME, MIDDLE, LASTNAME, ADDRESS1, ADDRESS2, EMAIL, CITY, STATE, ZIP, INACTIVE, PHONE_CELL, PHONE_HOME, PROVIDER, BIRTHDATE, FIRST_DATE, LAST_DATE FROM PATIENTLIST')
    // console.log('Patients:', x)
    dbInstance.close()
    return x as IPatientBasicInfo[]
  }

  async getAppointmentsFromDatabase () : Promise<IPatientAppointment[]> {
    const dbInstance = await odbc.connect(this.getConnectionString)
    const x = await dbInstance.query('SELECT PROVIDER_NAME, DATE, TIME, DATE_TIME, PATIENT, VISIT_TYPE, GUID FROM APPOINTMENTLIST')
    dbInstance.close()
    // console.log('Appointemnts:', x)
    return x as IPatientAppointment[]
  }

  mapAppointmentToPatient (appointments: IPatientAppointment[]) : Promise<IPatient[]> {
    return Promise.resolve()
      .then(() => {
        return this.getPatientsFromDatabase()
      })
      .then((patients: IPatientBasicInfo[]) => {
        // beginning of fix the appointments to the patients
        const patientcodes = appointments.map((appt) => {
          return appt.patient
        })

        patients.forEach((patient, index) => {
          if (patientcodes[index]) {
            patient.client = patientcodes[index] as string
            patient.code = patient.client
          }
        })
        // end the fix here

        return appointments.map((appointment) => {
          const mappedPatient = {} as IPatient
          this.mapAppointment(mappedPatient, appointment)
          // console.log('The patients: ', patients)
          const patientBasicInfo = patients.find((patient: any) => {
            return mappedPatient.patient !== null && mappedPatient.patient === patient['CLIENT']
          })
          if (patientBasicInfo) {
            this.mapBasicInfo(mappedPatient, patientBasicInfo)
          }
          return mappedPatient
        })
      })
  }

  private mapAppointment (patient: IPatient, appointment: any) : IPatient {
    if (appointment) {
      patient.providerName = appointment['PROVIDER_NAME']
      patient.date = appointment['DATE']
      patient.time = appointment['TIME']
      patient.dateTime = appointment['DATE_TIME']
      patient.visitType = appointment['VISIT_TYPE']
      patient.appointmentId = appointment['GUID']
      patient.patient = appointment['PATIENT']
    }
    return patient
  }

  private mapBasicInfo (patient: IPatient, patientBasicInfo: any) {
    if (patientBasicInfo) {
      patient.code = patientBasicInfo['CODE']
      patient.client = patientBasicInfo['CLIENT']
      patient.fullname = patientBasicInfo['FULLNAME']
      patient.firstname = patientBasicInfo['FIRSTNAME']
      patient.middle = patientBasicInfo['MIDDLE']
      patient.lastname = patientBasicInfo['LASTNAME']
      patient.address1 = patientBasicInfo['ADDRESS1']
      patient.address2 = patientBasicInfo['ADDRESS2']
      patient.email = patientBasicInfo['EMAIL']
      patient.city = patientBasicInfo['CITY']
      patient.state = patientBasicInfo['STATE']
      patient.zip = patientBasicInfo['ZIP']
      patient.inactive = patientBasicInfo['INACTIVE']
      patient.phoneCell = patientBasicInfo['PHONE_CELL']
      patient.phoneHome = patientBasicInfo['PHONE_HOME']
      patient.provider = patientBasicInfo['PROVIDER']
      patient.birthdate = patientBasicInfo['BIRTHDATE']
      patient.firstDate = patientBasicInfo['FIRST_DATE']
      patient.lastDate = patientBasicInfo['LAST_DATE']
    }
    return patient
  }
}
