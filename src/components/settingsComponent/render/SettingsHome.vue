<template>
  <div>
    <b-card>
      <b-card-title>
        <b-row>
          <b-col>
            Settings
          </b-col>
        </b-row>
      </b-card-title>
      <b-row
        class="mt-4"
        align-h="center"
      >
        <b-col cols="2">
          <div>
            <b-list-group>
              <b-list-group-item
                :active="currentlySelectedSettings === settingsSections.MESSAGING"
                @click="openSettings(settingsSections.MESSAGING)"
              >
                Messaging
              </b-list-group-item>
              <b-list-group-item
                :active="currentlySelectedSettings === settingsSections.DATA_SOURCE_MANAGEMENT"
                @click="openSettings(settingsSections.DATA_SOURCE_MANAGEMENT)"
              >
                Data Sources
              </b-list-group-item>
              <b-list-group-item
                :active="currentlySelectedSettings === settingsSections.ACCOUNT"
                @click="openSettings(settingsSections.ACCOUNT)"
              >
                Account
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col>
          <b-card>
            <div
              v-if="currentlySelectedSettings === settingsSections.ACCOUNT"
            >
              <account-settings />
            </div>
            <div
              v-else-if="currentlySelectedSettings === settingsSections.MESSAGING"
            >
              <message-settings />
            </div>
            <div
              v-else-if="currentlySelectedSettings === settingsSections.DATA_SOURCE_MANAGEMENT"
            >
              <data-source-settings />
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SettingsAccount from './SettingsAccount.vue'
import SettingsDataSources from './SettingsDataSources.vue'
import SettingsMessaging from './SettingsMessaging.vue'

enum SettingsSections {
  MESSAGING='messagingSettings',
  ACCOUNT='accountSettings',
  DATA_SOURCE_MANAGEMENT='dataSourceManagement'
}

@Component({
  name: 'SettingsHomeCard',
  components: {
    'message-settings': SettingsMessaging,
    'account-settings': SettingsAccount,
    'data-source-settings': SettingsDataSources
  }
})
export default class SettingsHomeCard extends Vue {
  private settingsSections = SettingsSections
  private currentlySelectedSettings: SettingsSections = this.settingsSections.MESSAGING

  private openSettings (settingSelection: SettingsSections) : void {
    if (this.currentlySelectedSettings !== settingSelection) {
      this.currentlySelectedSettings = settingSelection
    }
  }
}
</script>
