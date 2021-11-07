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
              <b-table
                sticky-header
                :select-mode="getSelectMode()"
                selectable
                :items="addressBook"
                @row-selected="onRowSelected"
              />
            </div>
            <div>
              <b-button
                @click="clearRecipientList()"
              >
                Clear
              </b-button>
              <b-button
                class="mx-3"
                :disabled="!recipientsIsSelected"
                @click="loadRecipientList()"
              >
                Load Recipients
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
              :items="messageRecipients"
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
              :disabled="showAlertCountdown > 0"
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
import { Component } from 'vue-property-decorator'

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
  private selectedRecipientMode: string | null = this.appointmentModes.BY_APPOINTMENT
  private messageRecipients: object[] = this.getMessageRecipients
  private addressBook: object[] = this.getAddressBook
  private selectedRecipientRows = []
  private showMessagePreview: boolean = false
  private showAlertCountdown: number = 0
  private alertDefaultCountdown: number = 5
  private showMessagePreviewOverlay: boolean = false
  private selectedMessageTemplate: object = {}
  private messageTemplates: object = this.getMessageTemplates

  get getMessageTemplates () : object[] {
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

  get recipientModes () : object[] {
    return [
      { value: null, text: 'Please select recipient loading mode' },
      { value: this.appointmentModes.BY_APPOINTMENT, text: 'By Appointment Date' },
      { value: this.appointmentModes.SINGLE_CONTACT, text: 'Single Contact' },
      { value: this.appointmentModes.MULTIPLE_CONTACTS, text: 'Multiple Contacts' }
    ]
  }

  get getMessageRecipients () : object[] {
    return [
      { age: 40, firstName: 'Dickerson', lastName: 'Macdonald' },
      { age: 21, firstName: 'Larsen', lastName: 'Shaw' },
      { age: 89, firstName: 'Geneva', lastName: 'Wilson' },
      { age: 38, firstName: 'Jami', lastName: 'Carney' }
    ]
  }

  get getAddressBook () : object[] {
    return [
      { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
    ]
  }

  private getSelectMode () {
    if (this.selectedRecipientMode === this.appointmentModes.SINGLE_CONTACT) {
      return 'single'
    } else if (this.selectedRecipientMode === this.appointmentModes.MULTIPLE_CONTACTS) {
      return 'multi'
    } else {
      return ''
    }
  }

  private onRowSelected (items: any) {
    this.selectedRecipientRows = items
  }

  private clearRecipientList () : void {
    this.messageRecipients = []
    if (this.selectedRecipientMode === this.appointmentModes.BY_APPOINTMENT) {
      this.selectedDateToLoadRecipients = ''
    }
  }

  private loadRecipientList () : void {
    if (this.selectedRecipientMode) {
      switch (this.selectedRecipientMode) {
        case this.appointmentModes.BY_APPOINTMENT:
          if (this.selectedDateToLoadRecipients) {
            this.messageRecipients = this.getMessageRecipients
          } else {
            this.messageRecipients = []
          }
          break
        case this.appointmentModes.SINGLE_CONTACT:
          this.messageRecipients = this.selectedRecipientRows
          break
        case this.appointmentModes.MULTIPLE_CONTACTS:
          this.messageRecipients = this.selectedRecipientRows
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
