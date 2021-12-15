import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientService from '../IPatientService'
import type IAppointment from '../../types/IAppointment'

const patientDataMockData = require('@/assets/MockPatientData.json')

@injectable()
export default class PatientService extends Vue implements IPatientService {
  private _patientList: IClientContactWithAppointment[] = []

  getNextAppointmentOfPatient (patient: IClientContactWithAppointment) : IAppointment {
    return {} as IAppointment
  }

  getAppointmentListOfPatient (patient: IClientContactWithAppointment) : IAppointment[] {
    return [] as IAppointment[]
  }

  getPatientByNameAndBirthDate (name: string) : IClientContactWithAppointment {
    return {} as IClientContactWithAppointment
  }

  async getListOfPatients () : Promise<IClientContactWithAppointment[]> {
    if (!this._patientList.length) {
      await this.loadPatientList()
      return this._patientList
    } else {
      return this._patientList
    }
  }

  private async getListOfPatientsFromApi () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return patientDataMockData
      })
  }

  async loadPatientList () : Promise<void> {
    this._patientList = await this.getListOfPatientsFromApi()
  }
}
