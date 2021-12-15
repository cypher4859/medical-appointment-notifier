import { cloneDeep } from 'lodash'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class SettingsMixin extends Vue {
  protected modelCopy: object = {}
  protected workingCopy: object = {}

  @Watch('modelCopy', { immediate: true, deep: true })
  onModelChange () {
    if (this.workingCopy !== this.modelCopy) {
      this.workingCopy = cloneDeep(this.modelCopy)
    }
  }

  saveSettings () {
    this.modelCopy = cloneDeep(this.workingCopy)
  }
}
