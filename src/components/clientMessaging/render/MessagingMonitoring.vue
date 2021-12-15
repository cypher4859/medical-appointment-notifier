<template>
  <div>
    <b-card>
      <b-card-title>
        <b-row>
          <b-col>
            Messaging Monitor Dashboard
          </b-col>
          <b-col cols="auto">
            <b-button
              v-b-toggle.toggle-monitoring-messages-dashboard-collapse
            >
              collapse
            </b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <b-collapse
        id="toggle-monitoring-messages-dashboard-collapse"
        visible
      >
        <b-row>
          <b-col>
            <b-card>
              <b-card-sub-title>
                <b-row>
                  <b-col>
                    Messaging Statistics - Graph
                  </b-col>
                  <!-- Commented out for now but related to issue #17 in project "Loose Ends" -->
                  <!-- <b-col cols="auto">
                    <b-button
                      v-b-toggle.toggle-monitoring-messages-graph-collapse
                    >
                      collapse
                    </b-button>
                  </b-col> -->
                </b-row>
              </b-card-sub-title>
              <b-collapse
                id="toggle-monitoring-messages-graph-collapse"
                visible
              >
                <b-row>
                  <b-col>
                    <div class="Chart">
                      <line-chart
                        :chart-data="dataCollection"
                        :options="chartOptions"
                      />
                    </div>
                    <b-row>
                      <b-col cols="auto">
                        <b-form-checkbox
                          id="enable-chart-messages-received"
                          v-model="showMessagesReceived"
                          name="enable-chart-messages-received"
                          :value="true"
                          :unchecked-value="false"
                        >
                          <div class="mx-2">
                            Show Messages Received
                          </div>
                        </b-form-checkbox>
                      </b-col>
                      <b-col cols="auto">
                        <b-form-checkbox
                          id="enable-chart-messages-of-accepted-appointments"
                          v-model="showMessagesOfAcceptedAppointments"
                          name="enable-chart-messages-of-accepted-appointments"
                          :value="true"
                          :unchecked-value="false"
                        >
                          <div class="mx-2">
                            Show Accepted Appointments
                          </div>
                        </b-form-checkbox>
                      </b-col>
                      <b-col cols="auto">
                        <b-form-checkbox
                          id="enable-chart-messages-of-cancelled-appointments"
                          v-model="showMessagesOfCancelledAppointments"
                          name="enable-chart-messages-of-cancelled-appointments"
                          :value="true"
                          :unchecked-value="false"
                        >
                          <div class="mx-2">
                            Show Cancelled Appointments
                          </div>
                        </b-form-checkbox>
                      </b-col>
                      <b-col cols="auto">
                        <b-form-checkbox
                          id="enable-chart-messages-sent"
                          v-model="showMessagesSent"
                          name="enable-chart-messages-sent"
                          :value="true"
                          :unchecked-value="false"
                        >
                          <div class="mx-2">
                            Show Messages Sent
                          </div>
                        </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-card>
              <b-card-sub-title>
                <b-row class="mb-2">
                  <b-col>
                    Messages Received - Details
                  </b-col>
                  <b-col cols="auto">
                    <b-button
                      v-b-toggle.toggle-monitoring-messages-details-collapse
                    >
                      collapse
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-sub-title>
              <b-collapse
                id="toggle-monitoring-messages-details-collapse"
                visible
              >
                <!-- List of messages -->
                <b-row align-h="end">
                  <b-col
                    cols="4"
                    class="d-flex"
                  >
                    <h5
                      class="align-center mx-3 pt-2"
                    >
                      Search
                    </h5>
                    <b-form-input
                      id="message-monitoring-data-table-search"
                      v-model="tableSearchCriteria"
                      type="search"
                      placeholder="Search the message list"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-table
                      id="messages-received-list-table"
                      sticky-header
                      select-mode="single"
                      selectable
                      sort-by="messageTimeStampDate"
                      :fields="messagesReceivedFields"
                      :current-page="currentMessageListPage"
                      :per-page="messagesPerPage"
                      :filter="tableSearchCriteria"
                      :items="preprocessMessagesList(messagesReceivedList)"
                      @row-selected="onRowSelected"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="auto">
                    <b-pagination
                      v-model="currentMessageListPage"
                      :total-rows="messagesReceivedList.length"
                      :per-page="messagesPerPage"
                      aria-controls="messages-received-list-table"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <strong>Items per Page:</strong>
                    <b-form-select
                      v-model="perPageSelect"
                      class="mx-3"
                      :options="perPageOptions"
                      @change="onPerPageSelect(perPageSelect)"
                    />
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </b-collapse>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import LineChart from '@/components/utilityComponents/LineChartCustom.vue'
import DateAndTime from 'date-and-time'
// import IMessageSms from '@/components/clientMessaging/types/IMessageSms'
import IMessageSmsDetails from '@/components/clientMessaging/types/IMessageSmsDetails'
import AppointmentStatus from '@/components/clientMessaging/services/AppointmentStatus'
import IMessageSms from '../types/IMessageSms'
import IClientContact from '../types/IClientContact'
import ServiceMixin from '@/mixins/service-mixin'

const mockMessagesReceived = require('@/assets/MockMessagesReceived.json') as IMessageSmsDetails[]
const mockMessagesSent = require('@/assets/MockMessagesSent.json') as IMessageSmsDetails[]
const mockPatientData = require('@/assets/MockPatientData.json') as IClientContact[]

@Component({
  name: 'messaging-monitor-dashboard',
  components: {
    'line-chart': LineChart
  }
})
export default class MessagingMonitoringDashboard extends Mixins(ServiceMixin) {
  private selectedMessageRows = []
  private messagesReceivedList: IMessageSmsDetails[] = []
  private messagesSentList: IMessageSmsDetails[] = []
  private patientList: IClientContact[] = []
  private tableSearchCriteria: string = ''
  private perPageSelect: number = 10
  private messagesPerPage: number = this.perPageSelect
  private currentMessageListPage: number = 1
  private gradient!: any
  private messagesReceivedFields: string[] = []
  private numberOfMessagesRecievedInTimeInterval: number[] = []
  private numberOfMessagesSentInTimeInterval: number[] = []
  private numberOfAcceptedAppointmentsInTimeInterval: number[] = []
  private numberOfCancelledAppointmentsInTimeInterval: number[] = []
  private dataCollection: object | null = null
  private interval: number = 30
  private collectionOfDatasets: object[] = []
  private showMessagesReceived: boolean = true
  private showMessagesSent: boolean = false
  private showMessagesOfAcceptedAppointments: boolean = true
  private showMessagesOfCancelledAppointments: boolean = false
  private chartOptions: object = {
    responsive: true,
    maintainAspectRatio: false
  }

  async beforeMount () {
    return Promise.resolve()
      .then(() => {
        return Promise.all([
          this.messagingService.loadMessagesReceived(),
          this.messagingService.loadMessagesSent()
        ])
      })
      .then(() => {
        this.patientList = this.messagingService.getAddressBook()
        this.messagesReceivedList = this.messagingService.getMessagesReceivedList()
        this.messagesSentList = this.messagingService.getMessagesSentList()
        this.messagesReceivedFields = this.messagingService.getMessageDetailsTableFields()

        this.messagesSentList.forEach((message) => {
          message.phoneNumber = '304-444-5555'
        })
      })
      .then(() => {
        this.numberOfMessagesRecievedInTimeInterval = this.getNumberOfMessagesReceivedInTimeInterval().reverse()
        this.numberOfMessagesSentInTimeInterval = this.getNumberOfMessagesSentInTimeInterval().reverse()
        this.numberOfAcceptedAppointmentsInTimeInterval = this.getNumberOfMessagesReceivedWithAcceptedAppointmentsInTimeInterval().reverse()
        this.numberOfCancelledAppointmentsInTimeInterval = this.getNumberOfMessagesReceivedWithCancelledAppointmentsInTimeInterval().reverse()
        this.initializeCollectionOfDatasets()

        // reverse the order so the graph is formed correctly
        this.dataCollection = {
          labels: this.getPreviousDatesByInterval(this.interval).map((date) => { return DateAndTime.format(date, 'MM/DD/YYYY') }).reverse(),
          datasets: this.collectionOfDatasets
        }
      })
  }

  initializeCollectionOfDatasets () {
    if (this.showMessagesReceived && !this.datasetIsInCollectionOfDatasets(this.messagesReceivedDataset)) {
      this.collectionOfDatasets.push(this.messagesReceivedDataset)
    }

    if (this.showMessagesSent && !this.datasetIsInCollectionOfDatasets(this.messagesSentDataset)) {
      this.collectionOfDatasets.push(this.messagesSentDataset)
    }

    if (this.showMessagesOfAcceptedAppointments && !this.datasetIsInCollectionOfDatasets(this.messagesOfAcceptedAppointmentsDataset)) {
      this.collectionOfDatasets.push(this.messagesOfAcceptedAppointmentsDataset)
    }

    if (this.showMessagesOfCancelledAppointments && !this.datasetIsInCollectionOfDatasets(this.messagesOfCancelledAppointmentsDataset)) {
      this.collectionOfDatasets.push(this.messagesOfCancelledAppointmentsDataset)
    }
  }

  @Watch('showMessagesReceived')
  onShowMessagesReceivedChange (newShowMessagesReceived: boolean, oldshowMessagesReceived: boolean) {
    this.$nextTick(() => {
      if (this.showMessagesReceived && !this.datasetIsInCollectionOfDatasets(this.messagesReceivedDataset)) {
        this.collectionOfDatasets.push(this.messagesReceivedDataset)
      } else if (!this.showMessagesReceived) {
        this.removeDatasetFromChart(this.collectionOfDatasets, this.messagesReceivedDataset)
      }
    })
  }

  @Watch('showMessagesSent')
  onShowMessagesSentChange (newShowMessagesSent: boolean, oldshowMessagesSent: boolean) {
    this.$nextTick(() => {
      if (this.showMessagesSent && !this.datasetIsInCollectionOfDatasets(this.messagesSentDataset)) {
        this.collectionOfDatasets.push(this.messagesSentDataset)
      } else if (!this.showMessagesSent) {
        this.removeDatasetFromChart(this.collectionOfDatasets, this.messagesSentDataset)
      }
    })
  }

  @Watch('showMessagesOfAcceptedAppointments')
  onShowMessagesOfAcceptedAppointmentsChange (newShowMessagesOfAcceptedAppointments: boolean, oldShowMessagesOfAcceptedAppointments: boolean) {
    this.$nextTick(() => {
      if (this.showMessagesOfAcceptedAppointments && !this.datasetIsInCollectionOfDatasets(this.messagesOfAcceptedAppointmentsDataset)) {
        this.collectionOfDatasets.push(this.messagesOfAcceptedAppointmentsDataset)
      } else if (!this.showMessagesOfAcceptedAppointments) {
        this.removeDatasetFromChart(this.collectionOfDatasets, this.messagesOfAcceptedAppointmentsDataset)
      }
    })
  }

  @Watch('showMessagesOfCancelledAppointments')
  onShowMessagesOfCancelledAppointmentsChange (newShowMessagesOfCancelledAppointments: boolean, oldShowMessagesOfCancelledAppointments: boolean) {
    this.$nextTick(() => {
      if (this.showMessagesOfCancelledAppointments && !this.datasetIsInCollectionOfDatasets(this.messagesOfCancelledAppointmentsDataset)) {
        this.collectionOfDatasets.push(this.messagesOfCancelledAppointmentsDataset)
      } else if (!this.showMessagesOfCancelledAppointments) {
        this.removeDatasetFromChart(this.collectionOfDatasets, this.messagesOfCancelledAppointmentsDataset)
      }
    })
  }

  private datasetIsInCollectionOfDatasets (dataset: object) {
    return this.collectionOfDatasets.includes(dataset)
  }

  private removeDatasetFromChart (collectionOfDatasets: object[], datasetToRemove: any) {
    const indexToSplit: number = collectionOfDatasets.findIndex((dataset: any) => {
      return dataset.label === datasetToRemove.label
    })
    if (indexToSplit > -1) {
      collectionOfDatasets.splice(indexToSplit, 1)
    }
  }

  getPreviousDatesByInterval (interval: number = 30) : Date[] {
    // get [1DayAgo, 2DaysAgo, 3DaysAgo]
    // By default we get the dates for the last 30 days
    const rawCurrentDate = DateAndTime.format(new Date(), 'MM/DD/YYYY')
    const cleanedCurrentDate = DateAndTime.parse(rawCurrentDate, 'MM/DD/YYYY')
    const listOfPreviousDates: Date[] = []

    for (let i = 1; i <= interval; i++) {
      const prevDay = DateAndTime.addDays(cleanedCurrentDate, -i)
      listOfPreviousDates.push(prevDay)
    }

    return listOfPreviousDates
  }

  getMessagesInTimeInterval (messageList: IMessageSmsDetails[]) : IMessageSmsDetails[][] {
    const dates = this.getPreviousDatesByInterval(this.interval)
    const messagesPerDay: IMessageSmsDetails[][] = []
    dates.forEach((day) => {
      messagesPerDay.push(this.getMessagesFromDate(day, messageList))
    })
    return messagesPerDay
  }

  getNumberOfMessagesInTimeInterval (messageList: IMessageSmsDetails[]) : number[] {
    const dates = this.getPreviousDatesByInterval(this.interval)
    const messagesPerDay: number[] = dates.map((day) => {
      return this.getNumberOfMessagesFromDate(day, messageList)
    })
    return messagesPerDay
  }

  getNumberOfMessagesFromDate (onDate: Date, messageList: IMessageSmsDetails[]) : number {
    return this.getMessagesFromDate(onDate, messageList).length
  }

  getMessagesFromDate (onDate: Date, messageList: IMessageSmsDetails[]) : IMessageSmsDetails[] {
    return messageList.filter((message: IMessageSmsDetails) => {
      const parsedmessageReceivedOnDate = DateAndTime.parse(message.messageTimeStampDate, 'MM/DD/YYYY')
      return DateAndTime.isSameDay(parsedmessageReceivedOnDate, onDate)
    })
  }

  getNumberOfMessagesReceivedOnDate (onDate: Date) : number {
    return this.getNumberOfMessagesFromDate(onDate, this.messagesReceivedList)
  }

  getNumberOfMessagesReceivedInTimeInterval () : number[] {
    return this.getNumberOfMessagesInTimeInterval(this.messagesReceivedList)
  }

  getMessagesReceivedOnDate (onDate: Date) : IMessageSmsDetails[] {
    return this.getMessagesFromDate(onDate, this.messagesReceivedList)
  }

  getNumberOfMessagesSentOnDate (onDate: Date) : number {
    return this.getNumberOfMessagesFromDate(onDate, this.messagesReceivedList)
  }

  getNumberOfMessagesSentInTimeInterval () : number[] {
    return this.getNumberOfMessagesInTimeInterval(this.messagesSentList)
  }

  getMessagesSentOnDate (onDate: Date) : IMessageSmsDetails[] {
    return this.getMessagesFromDate(onDate, this.messagesReceivedList)
  }

  get perPageOptions () : object[] {
    return [
      { value: 2, text: '2' },
      { value: 10, text: '10' },
      { value: 15, text: '15' },
      { value: 30, text: '30' },
      { value: this.messagesReceivedList.length, text: 'All' }
    ]
  }

  private onPerPageSelect (perPage: number) : void {
    this.messagesPerPage = perPage
  }

  private onRowSelected (items: any) {
    this.selectedMessageRows = items
  }

  getNumberOfMessagesReceivedWithAcceptedAppointmentsInTimeInterval () : number[] {
    // Example data set
    // [
    //   someDate: [message1, message2, message3],
    //   anotherDate: [message1, message2],
    //   thirdDate: [message1, message2,message3, message4]
    // ]
    return this.getMessagesInTimeInterval(this.messagesReceivedList).map((dayOfMessages: IMessageSmsDetails[]) => {
      // filter out the messages with accepted appointments
      const messagesWithAcceptedAppointments: IMessageSmsDetails[] = dayOfMessages.filter((message) => {
        return this.isMessageTextAppointmentStatus(message, AppointmentStatus.ACCEPTED)
      })
      // then get that number
      return messagesWithAcceptedAppointments.length
    })
  }

  getNumberOfMessagesReceivedWithCancelledAppointmentsInTimeInterval () : number[] {
    return this.getMessagesInTimeInterval(this.messagesReceivedList).map((dayOfMessages: IMessageSmsDetails[]) => {
      const messagesWithCancelledAppointments: IMessageSmsDetails[] = dayOfMessages.filter((message) => {
        return this.isMessageTextAppointmentStatus(message, AppointmentStatus.CANCELLED)
      })
      // then get that number
      return messagesWithCancelledAppointments.length
    })
  }

  isMessageTextAppointmentStatus (message: IMessageSmsDetails, status: AppointmentStatus) : boolean {
    switch (status) {
      case AppointmentStatus.ACCEPTED:
        return this.isMessageTextAppointmentStatusAccepted(message)
      case AppointmentStatus.CANCELLED:
        return this.isMessageTextAppointmentStatusCancelled(message)
      default:
        return this.isMessageTextAppointmentStatusUnknown(message)
    }
  }

  isMessageTextAppointmentStatusAccepted (message: IMessageSmsDetails) : boolean {
    return message.messageText === 'y'
  }

  isMessageTextAppointmentStatusCancelled (message: IMessageSmsDetails) : boolean {
    return message.messageText === 'n'
  }

  isMessageTextAppointmentStatusUnknown (message: IMessageSmsDetails) : boolean {
    return (message.messageText !== 'y' && message.messageText !== 'n')
  }

  get preprocessMessagesList () : (messageList: IMessageSmsDetails[]) => IMessageSmsDetails[] {
    return (messageList) : IMessageSmsDetails[] => {
      return messageList
        .map((message) => {
          return this.preprocessMessagesGetAppointmentStatusResponse(message)
        })
        // .map((message) => {
        //   return this.preprocessMessagesGetPatientName(message)
        // })
    }
  }

  preprocessMessagesGetAppointmentStatusResponse (message: IMessageSmsDetails) : IMessageSmsDetails {
    if (this.isMessageTextAppointmentStatus(message, AppointmentStatus.ACCEPTED)) {
      message.appointmentStatusResponse = AppointmentStatus.ACCEPTED
    } else if (this.isMessageTextAppointmentStatus(message, AppointmentStatus.CANCELLED)) {
      message.appointmentStatusResponse = AppointmentStatus.CANCELLED
    } else {
      message.appointmentStatusResponse = AppointmentStatus.UNKNOWN
    }
    return message
  }

  preprocessMessagesGetPatientName (message: IMessageSmsDetails) : IMessageSmsDetails {
    const patientName = this.patientList
      .find((patient) => {
        return patient.phoneNumber === message.phoneNumber
      })

    if (patientName) {
      message.fullName = patientName.fullName
    }
    return message
  }

  get messagesReceivedDataset () : object {
    return {
      label: 'Messages Received',
      borderColor: '#FC2525',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.numberOfMessagesRecievedInTimeInterval
    }
  }

  get messagesSentDataset () : object {
    return {
      label: 'Messages Sent',
      borderColor: '#04BCCF',
      pointBackgroundColor: '#52E1F0',
      borderWidth: 1,
      pointBorderColor: '#52E1F0',
      data: this.numberOfMessagesSentInTimeInterval
    }
  }

  get messagesOfAcceptedAppointmentsDataset () : object {
    return {
      label: 'Accepted Appointments',
      borderColor: '#04CF57',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.numberOfAcceptedAppointmentsInTimeInterval
    }
  }

  get messagesOfCancelledAppointmentsDataset () : object {
    return {
      label: 'Cancelled Appointments',
      borderColor: '#CF04C3',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.numberOfCancelledAppointmentsInTimeInterval
    }
  }
}
</script>
<style lang="scss" scoped>
  .Chart {
    background: #212733;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin:  25px 0;
  }

  .Chart h2 {
    margin-top: 0;
    padding: 15px 0;
    text-align: center;
    color:  rgba(255, 0,0, 0.5);
    border-bottom: 1px solid #323d54;
  }
</style>
