import store from '@/store'
import { cloneDeep } from 'lodash'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import IClientContactWithAppointment from '../types/IClientContactWithAppointment'

@Module({ dynamic: true, store: store, name: 'PatientStore' })
export default class PatientStore extends VuexModule {
  private _patientList: IClientContactWithAppointment[] = []
  private _selectedConnectionType: string = ''

  get getListOfPatients () : IClientContactWithAppointment[] {
    return this._patientList
  }

  get getSelectedConnectionType () : string {
    return this._selectedConnectionType
  }

  @Action({ commit: 'setConnectionTypeInStore' })
  setConnectionType (type: string) {
    return type
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
  setConnectionTypeInStore (type: string) {
    this._selectedConnectionType = type
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
