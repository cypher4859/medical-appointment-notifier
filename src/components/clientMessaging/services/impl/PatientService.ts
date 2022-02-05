import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientService from '../IPatientService'
import type IAppointment from '../../types/IAppointment'
import { inject } from 'inversify'
import TYPES from '@/InjectableTypes/types'
import type IVuexPatientService from '../IVuexPatientService'

@injectable()
export default class PatientService extends Vue implements IPatientService {
  // private _patientList: IClientContactWithAppointment[] = []
  @inject(TYPES.IVuexPatientService)
  private vuexPatientService!: IVuexPatientService

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
    return Promise.resolve()
      .then(() => {
        return this.vuexPatientService.getListOfPatients()
      })
  }

  async loadPatientList () : Promise<IClientContactWithAppointment[]> {
    return Promise.resolve()
      .then(() => {
        return this.vuexPatientService.loadPatientList()
      })
  }

  async setConnectionType (type: string) : Promise<void> {
    return this.getConnectionType()
      .then((connectionType) => {
        if (connectionType !== type) {
          return this.vuexPatientService.setConnectionType(type)
        }
      })
  }

  async getConnectionType () : Promise<string> {
    return this.vuexPatientService.getConnectionType()
  }
}
