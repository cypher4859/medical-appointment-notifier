import store from '@/store'
import { cloneDeep } from 'lodash'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'

@Module({ dynamic: true, store: store, name: 'PatientStore' })
export default class PatientStore extends VuexModule {
  private _patientList: IClientContactWithAppointment[] = []

  get getListOfPatients () : IClientContactWithAppointment[] {
    return this._patientList
  }

  @Action({ commit: 'loadPatientListIntoStore' })
  loadPatientList (patientList: IClientContactWithAppointment[]) {
    return patientList
  }

  @Action({ commit: 'clearPatientListInStore' })
  clearPatientList () {
    return undefined
  }

  @Mutation
  loadPatientListIntoStore (patientList: IClientContactWithAppointment[]) {
    this._patientList = cloneDeep(patientList)
  }

  @Mutation
  clearPatientListInStore () {
    this._patientList = []
  }
}
