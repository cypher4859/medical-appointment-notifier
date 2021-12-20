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
            per-page="10"
            current-page="1"
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
                      @click="onSubmitChangesToMessageTemplate()"
                    >
                      Submit
                    </b-button>
                    <b-button
                      @click="onResetChangesToMessageTemplate()"
                    >
                      Reset
                    </b-button>
                    <b-button
                      class="mx-1"
                      variant="danger"
                      @click="showDeleteTemplateModal()"
                    >
                      Delete
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
      <b-row align-h="end">
        <b-col
          v-if="selectedMessageTemplate"
        >
          <b-card>
            <b-row>
              <b-col>
                <b-card-sub-title>
                  {{ selectedMessageTemplateExample.text }}
                </b-card-sub-title>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col>
                <b>{{ selectedMessageTemplateExample.value }}</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="auto">
          <b-button
            @click="addNewDefaultTemplate()"
          >
            Add Template
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            id="popover-help-message-template-settings-list-keywords"
          >
            Help
          </b-button>
        </b-col>
      </b-row>
      <b-popover
        target="popover-help-message-template-settings-list-keywords"
        triggers="click"
        placement="righttop"
      >
        <template #title>
          Message Template Keywords
        </template>
        <b-row>
          <b-col>
            <b-alert
              show
              variant="info"
            >
              <span>The following a list of special keywords to use in the message template. When using a template containing keywords to send messages the keyword will be replaced by it's corresponding value in the final message to be sent.</span>
              <br>
              <ul>
                <li
                  v-for="(keyword, index) in messageTemplateKeywords"
                  :key="index"
                >
                  %{{ keyword }}%
                </li>
              </ul>
            </b-alert>
            <b-button
              @click="openKeywordHelpModal()"
            >
              More Info
            </b-button>
          </b-col>
        </b-row>
      </b-popover>
    </b-container>
    <b-modal
      v-if="selectedMessageTemplate"
      v-model="showDeleteTemplateWarning"
      hide-header-close
      title="Deletion Warning"
      hide-footer
    >
      <b-row>
        <b-col>
          You are about to delete the following message template. Do you want to continue?
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card>
            <div>
              <h4>
                Message Template
              </h4>
            </div>
            <div class="mt-4">
              <b-card-sub-title>
                {{ selectedMessageTemplate.text }}
              </b-card-sub-title>
              <b-card-text>
                {{ selectedMessageTemplate.value }}
              </b-card-text>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row
        class="mt-5"
        align-h="center"
      >
        <b-col cols="auto">
          <b-button
            @click="cancelDeletionRequest()"
          >
            Cancel
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            @click="requestDeleteTemplate()"
          >
            Submit
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model="showKeywordsHelp"
      hide-header-close
      title="Messaging Templates - Help"
      hide-footer
    >
      <b-row>
        <b-col>
          Help Info about the Message Template Keywords
        </b-col>
      </b-row>
    </b-modal>
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
  private showDeleteTemplateWarning: boolean = false
  private showKeywordsHelp: boolean = false

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

  addNewDefaultTemplate () {
    const template = this.messagingService.getDefaultMessagingTemplate()
    // Do this manually for now
    if (!this.messageTemplates.find((messageTemplate) => { return messageTemplate.id === template.id })) {
      this.messageTemplates.push(template)
    }
  }

  cancelDeletionRequest () {
    return Promise.resolve()
      .then(() => {
        this.showDeleteTemplateWarning = false
      })
  }

  showDeleteTemplateModal () {
    return Promise.resolve()
      .then(() => {
        if (!this.showDeleteTemplateWarning) {
          this.showDeleteTemplateWarning = true
        }
      })
  }

  requestDeleteTemplate () {
    return Promise.resolve()
      .then(() => {
        if (this.selectedMessageTemplate) {
          const templateToDelete = this.selectedMessageTemplate
          const indexOfTemplateToDelete = this.messageTemplates.findIndex((template) => {
            return template.id === templateToDelete.id
          })
          this.$data.messageTemplates.splice(indexOfTemplateToDelete, 1)
          console.log(this.messageTemplates)
        }
      })
      .then(() => {
        this.showDeleteTemplateWarning = false
      })
  }

  get messageTemplateKeywords () : string[] {
    return this.messagingService.getMessageTemplateKeywords()
  }

  openKeywordHelpModal () {
    this.showKeywordsHelp = !this.showKeywordsHelp
  }

  get selectedMessageTemplateExample () : ISmsMessageTemplate | null {
    const examplePatient = this.messagingService.getExamplePatient()
    return this.messagingService.getMessageTransformedKeyword(this.messageTemplateWorkingCopy as ISmsMessageTemplate, examplePatient)
  }
}
</script>
