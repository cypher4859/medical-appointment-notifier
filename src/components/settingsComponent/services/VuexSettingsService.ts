
import 'reflect-metadata'
import { inject, injectable } from 'inversify-props'
import { Vue, Component } from 'vue-property-decorator'
import ComponentStore from '@/components/settingsComponent/state-management/SettingsStore'
import { getModule } from 'vuex-module-decorators'

const componentStore = getModule(ComponentStore)

@injectable()
export default class VuexChildService extends Vue {
}
