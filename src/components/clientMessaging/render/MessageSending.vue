<template>
  <div>
    <b-card>
      <b-card-title>
        Sending Messages
      </b-card-title>
      <b-row>
        <b-col>
          <b-card>
            <div>
              <b-card-sub-title class="mb-3">
                Messaging Mode:
              </b-card-sub-title>
              <b-form-select
                v-model="selectedRecipientMode"
                class="mb-3"
                :options="recipientModes"
              />
            </div>
            <div v-if="selectedRecipientMode === appointmentModes.BY_APPOINTMENT">
              <b-alert
                show
                variant="info"
              >
                {{ getContactSelectionHelpMessage }}
              </b-alert>
              <b-form-datepicker
                id="example-datepicker"
                v-model="selectedDateToLoadRecipients"
                class="mb-3"
              />
            </div>
            <div v-if="selectedRecipientMode === appointmentModes.SINGLE_CONTACT || selectedRecipientMode === appointmentModes.MULTIPLE_CONTACTS">
              <b-alert
                show
                variant="info"
              >
                {{ getContactSelectionHelpMessage }}
              </b-alert>
              <h5
                class="align-center mx-3 pt-2"
              >
                Address Book
              </h5>
              <b-form-input
                id="message-sending-data-table-search"
                v-model="addressBookTableSearchCriteria"
                class="mb-2"
                type="search"
                placeholder="Search the address book"
              />
              <b-table
                ref="addressBookTable"
                sticky-header
                selectable
                :select-mode="getSelectMode()"
                :filter="addressBookTableSearchCriteria"
                :fields="getAddressBookTableHeaders"
                :items="addressBook"
                @row-selected="onRowSelected"
              />
            </div>
            <div>
              <b-button
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
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card>
            <b-card-sub-title>Recipient List</b-card-sub-title>
            <b-table
              striped
              hover
              show-empty
              :fields="getAddressBookTableHeaders"
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
          </b-card>
          <b-card class="mt-3">
            <b-card-sub-title>Message Template</b-card-sub-title>
            <b-form-select
              v-model="selectedMessageTemplate"
              class="mt-2"
              :options="messageTemplates"
            />
            <b-card-text class="mt-4">
              Example: <h4>{{ selectedMessageTemplate }}</h4>
            </b-card-text>
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
        <b-col cols="1">
          <div>
            <b-button
              :disabled="showAlertCountdown > 0 || messageRecipients.length === 0 || selectedMessageTemplate === null"
              @click="showSendMessagePreview()"
            >
              Send
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      v-model="showMessagePreview"
      hide-header-close
      title="Message Preview"
      hide-footer
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
            :fields="getRecipientListPreviewTableHeader"
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
            @click="sendMessage()"
          >
            Send Message
          </b-button>
        </div>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import DateAndTime from 'date-and-time'
import ISmsMessageTemplate from '@/components/clientMessaging/types/ISmsMessageTemplate'
import IClientRecipientWithAppointment from '@/components/clientMessaging/types/IClientRecipientWithAppointment'
import cloneDeep from 'lodash'
import IClient from '../types/IClient'

const mockData = require('@/assets/MockPatientData.json')

enum AppointmentModes {
  BY_APPOINTMENT='byAppointment',
  SINGLE_CONTACT='singleContact',
  MULTIPLE_CONTACTS='multipleContacts'
}

@Component({
  name: 'sms-message-sending'
})
export default class SmsMessageSending extends Vue {
  private appointmentModes = AppointmentModes
  private selectedDateToLoadRecipients: string = ''
  private selectedRecipientMode: AppointmentModes | null = this.appointmentModes.BY_APPOINTMENT
  private messageRecipients: IClientRecipientWithAppointment[] = []
  private addressBook: IClientRecipientWithAppointment[] = this.getAddressBook
  private selectedRecipientRows: IClientRecipientWithAppointment[] = []
  private showMessagePreview: boolean = false
  private showAlertCountdown: number = 0
  private alertDefaultCountdown: number = 5
  private showMessagePreviewOverlay: boolean = false
  private selectedMessageTemplate: ISmsMessageTemplate | null = null
  private messageTemplates: ISmsMessageTemplate[] = this.getMessageTemplates
  private recipientsPerPage: number = 7
  private currentRecipientListPage: number = 1
  private addressBookTableSearchCriteria: string = ''
  private previewRecipientsPerPage: number = 7
  private previewCurrentRecipientListPage: number = 1

  @Watch('selectedRecipientMode')
  onMessagingModeChange () {
    this.clearRecipientList()
  }

  @Watch('selectedRecipientRows')
  onAddressBookSelectedRowChange (newSelected: any, oldSelected: any) {
    this.messageRecipients = this.selectedRecipientRows
  }

  get getMessageTemplates () : ISmsMessageTemplate[] {
    return [
      {
        value: null, text: 'Please Select You Message Template'
      },
      {
        value: 'You have an appointment at "TIME" on "DATE"', text: 'Default - You have an appointment'
      },
      {
        value: 'Happy Halloween! Get your vaccines before Trick Or Treat!', text: 'Happy Halloween!'
      },
      {
        value: 'Get Prepared for the Holiday Spirit!', text: 'Merry Christmas!'
      }
    ]
  }

  get recipientModes () : ISmsMessageTemplate[] {
    return [
      { value: null, text: 'Please select recipient loading mode' },
      { value: this.appointmentModes.BY_APPOINTMENT, text: 'By Appointment Date' },
      { value: this.appointmentModes.SINGLE_CONTACT, text: 'Single Contact' },
      { value: this.appointmentModes.MULTIPLE_CONTACTS, text: 'Multiple Contacts' }
    ]
  }

  get getMessageRecipientsOnAppointmentDate () : (dateToLoadAppointments: string) => IClientRecipientWithAppointment[] {
    return (dateToLoadAppointments) => {
      return this.addressBook.filter((contact: IClientRecipientWithAppointment) => {
        return DateAndTime.isSameDay(DateAndTime.parse(contact.appointmentDateTime!, 'MM/DD/YYYY'), DateAndTime.parse(dateToLoadAppointments, 'YYYY-MM-DD'))
      })
    }
  }

  get getAddressBook () : IClientRecipientWithAppointment[] {
    return mockData
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

  get getAddressBookTableHeaders () : string[] {
    return ['fullName', 'phoneNumber', 'dateOfBirth', 'appointmentDateTime', 'appointmentAccepted']
  }

  get getRecipientListPreviewTableHeader () : string[] {
    return ['fullName', 'phoneNumber', 'dateOfBirth', 'appointmentDateTime']
  }

  private onRowSelected (items: IClientRecipientWithAppointment[]) {
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

  private async sendMessage () {
    return Promise.resolve()
      .then(() => {
        this.showMessagePreviewOverlay = true
      })
      .then(() => {
        console.log('Sending message')
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

  get getContactSelectionHelpMessage () : string {
    if (this.selectedRecipientMode === this.appointmentModes.SINGLE_CONTACT) {
      return 'Please a single contact to message.'
    } else if (this.selectedRecipientMode === this.appointmentModes.MULTIPLE_CONTACTS) {
      return 'Please select the contacts you wish to message. You may select more than one contact by selecting the row.'
    } else if (this.selectedRecipientMode === this.appointmentModes.BY_APPOINTMENT) {
      return 'Please select a select a date and click to Load Recipients with the patients that have an appointment on that selected day.'
    } else {
      return ''
    }
  }
}
</script>
