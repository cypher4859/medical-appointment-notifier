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
              #cell(text)="row"
            >
              <b-row
                v-if="row.rowSelected"
              >
                <b-col>
                  <b-form>
                    <b-form-group>
                      <b-form-input
                        id="edit-selected-message-template-text"
                        v-model="messageTemplateWorkingCopy.text"
                        :disabled="!selectedMessageTemplate"
                      />
                    </b-form-group>
                  </b-form>
                </b-col>
              </b-row>
              <div v-else>
                {{ row.item.text }}
              </div>
            </template>

            <template
              v-if="selectedMessageTemplate"
              #cell(value)="row"
            >
              <b-form
                v-if="row.rowSelected"
              >
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                        id="edit-selected-message-template-value"
                        v-model="messageTemplateWorkingCopy.value"
                        :disabled="!selectedMessageTemplate"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="auto">
                    <b-button
                      class="mx-1"
                      variant="primary"
                      @click="onSubmitChangesToMessageTemplate()"
                    >
                      Submit
                    </b-button>
                    <b-button
                      variant="danger"
                      @click="onResetChangesToMessageTemplate()"
                    >
                      Reset
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
              <div v-else>
                {{ row.item.value }}
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Mixins, Watch } from 'vue-property-decorator'
import SettingsMixin from '@/mixins/settings-mixin'
import ServiceMixin from '@/mixins/service-mixin'
import type ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import { cloneDeep } from 'lodash'

@Component({
  name: 'SettingsMessaging'
})
export default class SettingsMessaging extends Mixins(SettingsMixin, ServiceMixin) {
  private messageTemplates: ISmsMessageTemplate[] = []
  private selectedMessageTemplate: ISmsMessageTemplate | null = null
  private messageTemplateWorkingCopy: ISmsMessageTemplate | null = null

  @Watch('selectedMessageTemplate', { immediate: true, deep: true })
  onSelectedMessageTemplateChange (newMessageTemplate: ISmsMessageTemplate, oldMessageTemplate: ISmsMessageTemplate) {
    if (this.selectedMessageTemplate !== this.messageTemplateWorkingCopy) {
      this.messageTemplateWorkingCopy = cloneDeep(this.selectedMessageTemplate)
    }
  }

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
  }

  onSubmitChangesToMessageTemplate () {
    const templateToChangeIndex = this.messageTemplates.findIndex((template) => {
      return template.id === this.messageTemplateWorkingCopy?.id
    })
    if (templateToChangeIndex > -1) {
      Vue.set(this.messageTemplates, templateToChangeIndex, this.messageTemplateWorkingCopy)
      this.onResetChangesToMessageTemplate()
    }
  }

  onResetChangesToMessageTemplate () {
    this.selectedMessageTemplate = null;
    (this.$refs.messagingTemplatesTable as any).clearSelected()
  }
}
</script>
