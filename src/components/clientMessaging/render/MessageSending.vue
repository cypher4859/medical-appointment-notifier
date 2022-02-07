<template>
  <div>
    <b-card>
      <b-card-title>
        <b-row>
          <b-col>
            Sending Messages
          </b-col>
          <b-col cols="auto">
            <b-button
              v-b-toggle.toggle-sending-messages-collapse
            >
              collapse
            </b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <b-collapse
        id="toggle-sending-messages-collapse"
        visible
      >
        <b-row>
          <b-col>
            <b-card>
              <div>
                <b-card-sub-title class="mb-3">
                  <b-row>
                    <b-col>
                      Messaging Mode:
                    </b-col>
                    <b-col cols="auto">
                      <b-button
                        v-b-toggle.toggle-sending-messages-messaging-mode-collapse
                      >
                        collapse
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card-sub-title>
              </div>
              <b-collapse
                id="toggle-sending-messages-messaging-mode-collapse"
                visible
              >
                <b-form-select
                  v-model="selectedRecipientMode"
                  class="mb-3"
                  :options="recipientModes"
                />
                <div class="mb-3">
                  <custom-popover-target
                    :popover-id="'send-messages-message-mode-info'"
                  />
                </div>
                <div v-if="selectedRecipientMode === appointmentModes.BY_APPOINTMENT">
                  <b-popover
                    target="custom-popover-target-send-messages-message-mode-info"
                    triggers="hover"
                    placement="left"
                  >
                    <b-alert
                      class="my-0"
                      show
                      variant="info"
                    >
                      {{ getContactSelectionHelpMessage }}
                    </b-alert>
                  </b-popover>
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="selectedDateToLoadRecipients"
                    class="mb-3"
                    :min="minimumDate"
                  />
                </div>
                <div v-if="selectedRecipientMode === appointmentModes.SINGLE_CONTACT || selectedRecipientMode === appointmentModes.MULTIPLE_CONTACTS">
                  <b-popover
                    target="custom-popover-target-send-messages-message-mode-info"
                    triggers="hover"
                    placement="left"
                  >
                    <b-alert
                      class="my-0"
                      show
                      variant="info"
                    >
                      {{ getContactSelectionHelpMessage }}
                    </b-alert>
                  </b-popover>
                  <h5
                    class="align-center mx-3 pt-2"
                  >
                    Address Book
                  </h5>
                  <b-form-input
                    id="message-sending-data-table-search"
                    v-model="addressBookTableSearchCriteria"
                    v-mask="addressBookMask"
                    class="mb-2"
                    type="search"
                    placeholder="Search the address book"
                  />
                  <b-table
                    ref="addressBookTable"
                    sticky-header
                    selectable
                    sort-by.sync="fullName"
                    :sort-desc="false"
                    :select-mode="getSelectMode()"
                    :filter="addressBookTableSearchCriteria"
                    :fields="addressBookTableHeaders"
                    :items="addressBook"
                    @row-selected="onRowSelected"
                  />
                </div>
                <div>
                  <b-button
                    :disabled="(selectedRecipientMode !== appointmentModes.BY_APPOINTMENT && selectedRecipientRows.length === 0) || (selectedRecipientMode === appointmentModes.BY_APPOINTMENT && selectedDateToLoadRecipients === '')"
                    @click="clearRecipientList()"
                  >
                    Clear Selection
                  </b-button>
                  <b-button
                    v-if="selectedRecipientMode === appointmentModes.BY_APPOINTMENT"
                    class="mx-3"
                    :disabled="!recipientsIsSelected"
                    @click="loadRecipientList()"
                  >
                    <span>
                      Load Recipients
                    </span>
                  </b-button>
                  <b-alert
                    class="mt-3"
                    :show="showNotificationOfLoadedSuccessfulRecipients"
                    variant="success"
                    @dismissed="showNotificationOfLoadedSuccessfulRecipients = 0"
                    @dismiss-count-down="showAlertSuccessfulLoadedRecipientChange"
                  >
                    Recipients have been loaded for the selected date! ... {{ showNotificationOfLoadedSuccessfulRecipients }}
                  </b-alert>
                  <b-alert
                    class="mt-3"
                    :show="showNotificationOfFailedLoadedRecipients"
                    variant="warning"
                    @dismissed="showNotificationOfFailedLoadedRecipients = 0"
                    @dismiss-count-down="showAlertFailedLoadedRecipientChange"
                  >
                    No Recipients have been loaded for the selected date! ... {{ showNotificationOfFailedLoadedRecipients }}
                  </b-alert>
                </div>
              </b-collapse>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-card-sub-title>
                <b-row>
                  <b-col>
                    Recipient List
                  </b-col>
                  <b-col cols="auto">
                    <b-button
                      v-b-toggle.toggle-sending-messages-recipient-list-collapse
                    >
                      collapse
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-sub-title>
              <b-collapse
                id="toggle-sending-messages-recipient-list-collapse"
                visible
              >
                <b-table
                  striped
                  hover
                  show-empty
                  sort-by.sync="fullName"
                  :fields="addressBookTableHeaders"
                  :items="messageRecipients"
                  :per-page="recipientsPerPage"
                  :current-page="currentRecipientListPage"
                />
                <b-pagination
                  v-if="messageRecipients.length >= recipientsPerPage"
                  v-model="currentRecipientListPage"
                  :total-rows="messageRecipients.length"
                  :per-page="recipientsPerPage"
                  aria-controls="messages-received-list-table"
                />
              </b-collapse>
            </b-card>
            <b-card class="mt-3">
              <b-card-sub-title>
                <b-row>
                  <b-col>
                    Message Template
                  </b-col>
                  <b-col cols="auto">
                    <b-button
                      v-b-toggle.toggle-sending-messages-message-template-collapse
                    >
                      collapse
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-sub-title>
              <b-collapse
                id="toggle-sending-messages-message-template-collapse"
                visible
              >
                <b-row>
                  <b-col>
                    <b-form-select
                      v-model="selectedMessageTemplate"
                      class="mt-2"
                      :options="messageTemplates"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-card-text class="mt-4">
                      Example:
                      <h4>
                        <div v-if="selectedMessageTemplate">
                          {{ getExampleMessageTemplateValue }}
                        </div>
                        <div v-else>
                          {{ 'Please select a template' }}
                        </div>
                      </h4>
                    </b-card-text>
                  </b-col>
                </b-row>
                <b-row v-if="selectedMessageTemplate">
                  <b-col>
                    <div class="mb-3">
                      <custom-popover-target
                        :popover-id="'send-messages-message-template-info'"
                      />
                    </div>
                    <b-popover
                      target="custom-popover-target-send-messages-message-template-info"
                      triggers="hover"
                      placement="bottomright"
                    >
                      <b-alert
                        class="my-0"
                        show
                        variant="info"
                      >
                        {{ 'This example is based on an example patient from the current patient list. This is meant to show what the message will ultiamtely appear as.' }}
                      </b-alert>
                    </b-popover>
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
        <b-row
          class="mt-3"
          align-h="end"
        >
          <b-col>
            <b-alert
              :show="showAlertCountdown"
              variant="success"
              @dismissed="showAlertCountdown = 0"
              @dismiss-count-down="showAlertChanged"
            >
              Messages successfully sent! ... {{ showAlertCountdown }}
            </b-alert>
          </b-col>
          <b-col cols="auto">
            <div>
              <b-popover
                target="popover-target-send-messages-warning"
                triggers="hover"
                placement="right"
              >
                <b-alert
                  class="my-0"
                  show
                  :variant="isValidToSendMessages ? 'info' : 'danger'"
                >
                  {{ getPopoverHelpInfoToSend }}
                </b-alert>
              </b-popover>
              <div id="popover-target-send-messages-warning">
                <b-button
                  :disabled="showAlertCountdown > 0 || messageRecipients.length === 0 || selectedMessageTemplate === null"
                  @click="showSendMessagePreview()"
                >
                  Send
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-collapse>
    </b-card>
    <b-modal
      v-model="showMessagePreview"
      hide-header-close
      title="Message Preview"
      hide-footer
      size="lg"
    >
      <b-overlay
        :show="showMessagePreviewOverlay"
        rounded
      >
        Please review the list of recipients and the message template you are about to send to these recipients.
        <b-card class="mt-3">
          <b-card-sub-title>Recipient List</b-card-sub-title>
          <b-table
            striped
            hover
            :items="messageRecipients"
            :fields="addressBookTableHeaders"
            :per-page="previewRecipientsPerPage"
            :current-page="previewCurrentRecipientListPage"
          />
          <b-pagination
            v-if="messageRecipients.length >= previewRecipientsPerPage"
            v-model="previewCurrentRecipientListPage"
            :total-rows="messageRecipients.length"
            :per-page="previewRecipientsPerPage"
            aria-controls="messages-received-list-table"
          />
        </b-card>
        <b-card class="mt-3">
          <b-card-sub-title>Message Preview</b-card-sub-title>
          <b-card-text>{{ selectedMessageTemplate }}</b-card-text>
        </b-card>
        <div class="mt-3">
          <b-button
            class="mx-3"
            @click="showMessagePreview = false"
          >
            Cancel
          </b-button>
          <b-button
            variant="primary"
            @click="sendMessages()"
          >
            Send Messages
          </b-button>
        </div>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import DateAndTime from 'date-and-time'
import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientContactWithAppointment from '@/components/clientMessaging/types/IClientContactWithAppointment'
import CustomPopoverTarget from '@/components/utilityComponents/CustomPopoverTarget.vue'
import ServiceMixin from '@/mixins/service-mixin'
import VMaskMixin from '@/mixins/vmask-mixin'
import IMessageSmsPayload from '../types/IMessageSmsPayload'

enum AppointmentModes {
  BY_APPOINTMENT='byAppointment',
  SINGLE_CONTACT='singleContact',
  MULTIPLE_CONTACTS='multipleContacts'
}

@Component({
  name: 'sms-message-sending',
  components: {
    'custom-popover-target': CustomPopoverTarget
  }
})
export default class SmsMessageSending extends Mixins(ServiceMixin, VMaskMixin) {
  @Prop({ type: Boolean, default: false }) private isAuthorized!: boolean

  private appointmentModes = AppointmentModes
  private recipientModes: object[] = []
  private addressBookTableHeaders: object[] = []

  private selectedDateToLoadRecipients: string = ''
  private selectedRecipientMode: AppointmentModes | null = this.appointmentModes.BY_APPOINTMENT
  private messageRecipients: IClientContactWithAppointment[] = []
  private addressBook: IClientContactWithAppointment[] = []
  private selectedRecipientRows: IClientContactWithAppointment[] = []
  private showMessagePreview: boolean = false
  private showAlertCountdown: number = 0
  private showNotificationOfLoadedSuccessfulRecipients: number = 0
  private showNotificationOfFailedLoadedRecipients: number = 0
  private alertDefaultCountdown: number = 5
  private showMessagePreviewOverlay: boolean = false
  private selectedMessageTemplate: string | null = null
  private messageTemplates: ISmsMessageTemplate[] = []
  private recipientsPerPage: number = 7
  private currentRecipientListPage: number = 1
  private addressBookTableSearchCriteria: string = ''
  private previewRecipientsPerPage: number = 7
  private previewCurrentRecipientListPage: number = 1
  private isValidToSendMessages: boolean = false
  private examplePatient: IClientContactWithAppointment = {} as IClientContactWithAppointment

  async created () {
    return Promise.resolve()
      .then(() => {
        return this.messagingService.getMessageTemplates()
          .then((templates) => {
            this.messageTemplates = templates
          })
      })
      .then(() => {
        return Promise.resolve()
          .then(() => {
            this.recipientModes = this.messagingService.getRecipientModes()
          })
      })
      .then(() => {
        return this.messagingService.getAddressBook()
          .then((addressBook) => {
            this.addressBook = addressBook
          })
      })
      .then(() => {
        return this.messagingService.getExamplePatient()
          .then((examplePatient) => {
            this.examplePatient = examplePatient
          })
      })
      .then(() => {
        return Promise.resolve()
          .then(() => {
            this.addressBookTableHeaders = this.messagingService.getAddressBookTableHeaders()
          })
      })
      .catch((e) => {
        throw new Error(e)
      })
  }

  @Watch('selectedRecipientMode')
  onMessagingModeChange () {
    this.clearRecipientList()
  }

  @Watch('selectedRecipientRows')
  onAddressBookSelectedRowChange (newSelected: any, oldSelected: any) {
    this.messageRecipients = this.selectedRecipientRows
  }

  get getMessageRecipientsOnAppointmentDate () : (dateToLoadAppointments: string) => IClientContactWithAppointment[] {
    return (dateToLoadAppointments) => {
      return this.addressBook.filter((contact: IClientContactWithAppointment) => {
        const x = DateAndTime.parse(contact.nextAppointment?.appointmentDate!, 'MM/DD/YYYY')
        const z = DateAndTime.parse(dateToLoadAppointments, 'YYYY-MM-DD')
        return DateAndTime.isSameDay(x, z)
      })
    }
  }

  private getSelectMode () : string {
    if (this.selectedRecipientMode === this.appointmentModes.SINGLE_CONTACT) {
      return 'single'
    } else if (this.selectedRecipientMode === this.appointmentModes.MULTIPLE_CONTACTS) {
      return 'multi'
    } else {
      return ''
    }
  }

  private onRowSelected (items: IClientContactWithAppointment[]) {
    this.selectedRecipientRows = items
  }

  private clearRecipientList () : void {
    this.messageRecipients = []
    if (this.selectedRecipientMode === this.appointmentModes.BY_APPOINTMENT) {
      this.selectedDateToLoadRecipients = ''
    } else if (this.selectedRecipientRows.length > 0) {
      (this.$refs.addressBookTable as any).clearSelected()
    }
  }

  private loadRecipientList () : void {
    if (this.selectedRecipientMode) {
      switch (this.selectedRecipientMode) {
        case this.appointmentModes.BY_APPOINTMENT:
          if (this.selectedDateToLoadRecipients) {
            this.messageRecipients = this.getMessageRecipientsOnAppointmentDate(this.selectedDateToLoadRecipients)
            if (this.messageRecipients.length) {
              this.showNotificationOfLoadedSuccessfulRecipients = this.alertDefaultCountdown
            } else {
              this.showNotificationOfFailedLoadedRecipients = this.alertDefaultCountdown
            }
          } else {
            this.messageRecipients = []
          }
          break
        case this.appointmentModes.SINGLE_CONTACT:
          // this.messageRecipients = this.selectedRecipientRows
          if (this.messageRecipients.length === 0 && !this.messageRecipients.includes(this.selectedRecipientRows[0])) {
            this.messageRecipients.push(this.selectedRecipientRows[0])
          }
          break
        case this.appointmentModes.MULTIPLE_CONTACTS:
          this.selectedRecipientRows.forEach((selectedRow) => {
            if (!this.messageRecipients.includes(selectedRow)) {
              this.messageRecipients.push(selectedRow)
            }
          })
          break
        default:
          this.clearRecipientList()
          break
      }
    }
  }

  get recipientsIsSelected () : boolean {
    if (this.selectedRecipientMode === this.appointmentModes.BY_APPOINTMENT) {
      return this.selectedDateToLoadRecipients !== ''
    } else if (this.selectedRecipientMode === this.appointmentModes.SINGLE_CONTACT || this.selectedRecipientMode === this.appointmentModes.MULTIPLE_CONTACTS) {
      return this.selectedRecipientRows.length > 0
    } else {
      return false
    }
  }

  private showSendMessagePreview () {
    this.showMessagePreview = true
  }

  private async sendMessages () {
    return Promise.resolve()
      .then(() => {
        this.showMessagePreviewOverlay = true
      })
      .then(() => {
        return this.messagingService.compileMessages(this.messageRecipients, this.selectedMessageTemplate as string)
      })
      .then((messages: IMessageSmsPayload[]) => {
        this.messagingService.sendMessages(messages)
      })
      .then(() => {
        this.showAlertCountdown = this.alertDefaultCountdown
        this.showMessagePreviewOverlay = false
        this.showMessagePreview = false
      })
      .then(() => {
        this.clearRecipientList()
      })
      .catch((e) => {
        this.showMessagePreviewOverlay = false
        this.showMessagePreview = false
      })
  }

  private showAlertChanged (showAlertCounter: number) {
    this.showAlertCountdown = showAlertCounter
  }

  private showAlertSuccessfulLoadedRecipientChange (counter: number) {
    this.showNotificationOfLoadedSuccessfulRecipients = counter
  }

  private showAlertFailedLoadedRecipientChange (counter: number) {
    this.showNotificationOfFailedLoadedRecipients = counter
  }

  get getContactSelectionHelpMessage () : string {
    if (this.selectedRecipientMode === this.appointmentModes.SINGLE_CONTACT) {
      return 'Please a single contact to message.'
    } else if (this.selectedRecipientMode === this.appointmentModes.MULTIPLE_CONTACTS) {
      return 'Please select the contacts you wish to message. You may select more than one contact by selecting the row.'
    } else if (this.selectedRecipientMode === this.appointmentModes.BY_APPOINTMENT) {
      return 'Please select a date and click to Load Recipients with the patients that have an appointment on that selected day.'
    } else {
      return ''
    }
  }

  // getMessageTransformedKeywordFromTemplate
  get getExampleMessageTemplateValue () : string {
    const template = this.messageTemplates.find((templ) => {
      return templ.value === this.selectedMessageTemplate
    }) as ISmsMessageTemplate
    return this.messagingService.getMessageTransformedKeywordFromTemplate(template, this.examplePatient).value as string
  }

  get getPopoverHelpInfoToSend () : string {
    if (this.messageRecipients.length !== 0 && this.selectedMessageTemplate === null) {
      this.isValidToSendMessages = false
      return 'Please select a message template before sending messages'
    } else if (this.messageRecipients.length === 0 && this.selectedMessageTemplate !== null) {
      this.isValidToSendMessages = false
      return 'Please load the recipient list by either selecting an appointment day while in Appointment Date Mode and Loading Recipients or by selecting recipient(s)'
    } else if (this.messageRecipients.length === 0 && this.selectedMessageTemplate === null) {
      this.isValidToSendMessages = false
      return 'Please load the recipient list by either selecting an appointment day while in Appointment Date Mode and Loading Recipients or by selecting recipient(s). Afterwards, please select a message template. You will be free to send messages at that point!'
    } else {
      this.isValidToSendMessages = true
      return 'Click to send messages to recipients'
    }
  }

  get minimumDate () : Date {
    const now = new Date()
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return minDate
  }
}
</script>
