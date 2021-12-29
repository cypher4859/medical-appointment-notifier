import store from '@/store'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { cloneDeep } from 'lodash'

@Module({ dynamic: true, store: store, name: 'SettingsStore' })
export default class SettingsStore extends VuexModule {
  private _apiKey: string = ''

  get getCurrentApiKey () : string {
    return this._apiKey
  }

  @Action({ commit: 'loadApiKeyIntoStore' })
  loadApiKey (key: string) {
    return key
  }

  @Mutation
  loadApiKeyIntoStore (key: string) {
    this._apiKey = cloneDeep(key)
  }
}
