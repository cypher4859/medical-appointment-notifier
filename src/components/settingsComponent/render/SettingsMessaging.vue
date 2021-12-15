<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-card-title>
            Messaging
          </b-card-title>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-sub-title>
            Message Templates
          </b-card-sub-title>
          <b-table
            striped
            hover
            :items="messageTemplates"
            :fields="messageTemplateFields"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import SettingsMixin from '@/mixins/settings-mixin'
import ServiceMixin from '@/mixins/service-mixin'
import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'

@Component({
  name: 'SettingsMessaging'
})
export default class SettingsMessaging extends Mixins(SettingsMixin, ServiceMixin) {
  private _messageTemplates: ISmsMessageTemplate[] = []

  beforeMount () {
    this._messageTemplates = this.messagingService.getMessageTemplates()
  }

  get messageTemplates () : ISmsMessageTemplate[] {
    return this._messageTemplates.filter((template) => {
      return template.value !== null
    })
  }

  get messageTemplateFields () : object[] {
    return [
      {
        key: 'text',
        label: 'Template Name'
      },
      {
        key: 'value',
        label: 'Definition'
      }
    ]
  }
}
</script>
