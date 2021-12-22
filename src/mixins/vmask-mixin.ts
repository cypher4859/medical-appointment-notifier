import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SettingsMixin extends Vue {
  // public nameMask: object = {
  //   mask: `C${makeStringOfLength('F', 118)}C`,
  //   tokens: {
  //     F: {
  //       pattern: /[0-9a-zA-Z _.-]/
  //     },
  //     C: {
  //       pattern: /[0-9a-zA-Z_.-]/
  //     }
  //   }
  // }

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
}
