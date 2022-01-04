import { injectable } from 'inversify-props'
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import type IClientContactWithAppointment from '../../types/IClientContactWithAppointment'
import type IPatientService from '../IPatientService'
import type IAppointment from '../../types/IAppointment'
import { inject } from 'inversify'
import PatientStore from '../../state-management/PatientStore'
import { getModule } from 'vuex-module-decorators'
import TYPES from '@/InjectableTypes/types'
import type IVuexPatientService from '../IVuexPatientService'
import type IApiPatientService from '../IApiPatientService'

const patientStore = getModule(PatientStore)

@injectable()
export default class VuexPatientService extends Vue implements IVuexPatientService {
  @inject(TYPES.IApiPatientService)
  private apiPatientService!: IApiPatientService

  async getListOfPatients () : Promise<IClientContactWithAppointment[]> {
    const patientList = patientStore.getListOfPatients
    if (!patientList.length) {
      return this.loadPatientList()
        .then(() => {
          return patientStore.getListOfPatients
        })
    } else {
      return patientList
    }
  }

  async loadPatientList () : Promise<IClientContactWithAppointment[]> {
    return this.apiPatientService.getListOfPatientsFromApi()
      .then((patientsFromApi) => {
        console.log('Patients: ', patientsFromApi)
        return patientStore.loadPatientList(patientsFromApi)
      })
  }
}
