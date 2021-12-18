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
            ref="messagingTemplatesTable"
            sticky-header
            hover
            select-mode="single"
            selectable
            :items="messageTemplates"
            :fields="messageTemplateFields"
            @row-selected="onRowSelected"
          >
            <template
              v-if="selectedMessageTemplate"
              #cell(value)="row"
            >
              <b-form-group v-if="row.rowSelected">
                <b-form-input
                  id="edit-selected-message-template"
                  v-model="selectedMessageTemplate.value"
                  placeholder="Please select a message template"
                  :disabled="!selectedMessageTemplate"
                />
              </b-form-group>
              <div v-else>
                {{ row.item.value }}
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form>
            <!-- <b-form-group>
              <b-form-input
                id="edit-selected-message-template"
                v-model="selectedMessageTemplate"
                placeholder="Please select a message template"
                :disabled="!selectedMessageTemplate"
              />
            </b-form-group> -->
            <!-- <b-form-group>
              <b-form-input
                id="edit-selected-message-template"
                v-model="selectedMessageTemplate.value"
                placeholder="Please select a message template"
                :disabled="!selectedMessageTemplate"
              />
            </b-form-group> -->
          </b-form>
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
  private messageTemplates: ISmsMessageTemplate[] = []
  private selectedMessageTemplate: ISmsMessageTemplate | null = null

  async beforeMount () {
    return Promise.resolve()
      .then(() => {
        return Promise.all([
          this.messagingService.loadMessageTemplates()
        ])
      })
      .then(() => {
        this.messageTemplates = this.messagingService
          .getMessageTemplates()
          .filter((template) => {
            return template.value !== null
          })
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

  onRowSelected (items: ISmsMessageTemplate[]) {
    this.selectedMessageTemplate = items[0]
    console.log('Selected Template:', this.selectedMessageTemplate)
  }
}
</script>
