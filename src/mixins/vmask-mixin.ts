import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SettingsMixin extends Vue {
  get addressBookMask () : object {
    const lengthOfMask: number = 200
    return {
      mask: 'C'.repeat(lengthOfMask),
      tokens: {
        C: {
          pattern: /[a-zA-Z0-9 ,_.-:]/
        }
      }
    }
  }

  get messagingSettingsMask () : object {
    const lengthOfMask: number = 200
    return {
      mask: 'C'.repeat(lengthOfMask),
      tokens: {
        C: {
          pattern: /[a-zA-Z0-9 %@!$&*(?)+=;'",_.-:]/
        }
      }
    }
  }

  get apiKeySettingsMask () : object {
    const lengthOfMask: number = 35
    return {
      mask: 'C'.repeat(lengthOfMask),
      tokens: {
        C: {
          pattern: /[a-zA-Z0-9 -_]/
        }
      }
    }
  }
}
