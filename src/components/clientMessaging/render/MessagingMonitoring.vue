<template>
  <div>
    <b-card>
      <b-card-title>
        Messaging Monitor Dashboard
      </b-card-title>
      <b-row>
        <b-col>
          <b-card>
            <b-card-sub-title>Messaging Statistics - Graph</b-card-sub-title>
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
                      id="enable-chart-messages-sent"
                      v-model="showMessagesSent"
                      name="enable-chart-messages-sent"
                      :value="true"
                      :unchecked-value="false"
                    >
                      <div class="mx-2">
                        All Messages Sent
                      </div>
                    </b-form-checkbox>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card>
            <b-card-sub-title>Messages Received - Details</b-card-sub-title>
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
                  :fields="messagesReceivedFields"
                  :current-page="currentMessageListPage"
                  :per-page="messagesPerPage"
                  :filter="tableSearchCriteria"
                  :items="messageList"
                  @row-selected="onRowSelected"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="auto">
                <b-pagination
                  v-model="currentMessageListPage"
                  :total-rows="messageList.length"
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
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { Component, Watch } from 'vue-property-decorator'
import LineChart from '@/components/utilityComponents/LineChartCustom.vue'
import DateAndTime from 'date-and-time'

const mockData = require('@/assets/MockPatientData.json')

@Component({
  name: 'messaging-monitor-dashboard',
  components: {
    'line-chart': LineChart
  }
})
export default class MessagingMonitoringDashboard extends Vue {
  private selectedMessageRows = []
  private messageList: object[] = []
  private tableSearchCriteria: string = ''
  private perPageSelect: number = 10
  private messagesPerPage: number = this.perPageSelect
  private currentMessageListPage: number = 1
  private gradient!: any
  private messagesReceivedFields: string[] = ['messageReceivedOnDate', 'messageReceivedAtTime', 'fullName', 'messageText', 'appointmentAccepted']
  private numberOfMessagesInTimeInterval: number[] = []
  private dataCollection: object | null = null
  private interval: number = 30
  private collectionOfDatasets: object[] = []
  private showMessagesReceived: boolean = true
  private showMessagesSent: boolean = false
  private showMessagesOfAcceptedAppointments: boolean = false
  private showMessagesOfCancelledAppointments: boolean = false
  private chartOptions: object = {
    responsive: true,
    maintainAspectRatio: false
  }

  async beforeMount () {
    const x = require('@/assets/MOCK_DATA.json')
    this.messageList = x
    this.numberOfMessagesInTimeInterval = this.getNumberOfMessagesInTimeInterval(this.interval)
    this.initializeCollectionOfDatasets()

    this.dataCollection = {
      labels: this.getIntervalOfDates(this.interval).map((date) => { return DateAndTime.format(date, 'MM/DD/YYYY') }).reverse(),
      datasets: this.collectionOfDatasets
    }
  }

  initializeCollectionOfDatasets () {
    if (this.showMessagesReceived && !this.datasetIsInCollectionOfDatasets(this.messagesReceivedDataset)) {
      this.collectionOfDatasets.push(this.messagesReceivedDataset)
    }

    if (this.showMessagesSent && !this.datasetIsInCollectionOfDatasets(this.messagesSentDataset)) {
      this.collectionOfDatasets.push(this.messagesSentDataset)
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

  getIntervalOfDates (interval: number = 30) : Date[] {
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

  getMessagesInTimeInterval (interval: number = 30) : object[] {
    const dates = this.getIntervalOfDates(interval)
    const messagesPerDay: object[] = dates.map((day) => {
      return this.getMessageReceivedOnDate(day)
    })
    return messagesPerDay
  }

  getNumberOfMessagesInTimeInterval (interval: number = 30) : number[] {
    const dates = this.getIntervalOfDates(interval)
    const messagesPerDay: number[] = dates.map((day) => {
      return this.getNumberOfMessagesReceivedOnDate(day)
    })
    return messagesPerDay
  }

  getNumberOfMessagesReceivedOnDate (onDate: Date) : number {
    return this.messageList.filter((message: any) => {
      const parsedmessageReceivedOnDate = DateAndTime.parse(message.messageReceivedOnDate, 'MM/DD/YYYY')
      return DateAndTime.isSameDay(parsedmessageReceivedOnDate, onDate)
    }).length
  }

  getMessageReceivedOnDate (onDate: Date) : object {
    return this.messageList.filter((message: any) => {
      const parsedmessageReceivedOnDate = DateAndTime.parse(message.messageReceivedOnDate, 'MM/DD/YYYY')
      return DateAndTime.isSameDay(parsedmessageReceivedOnDate, onDate)
    })
  }

  get getSampleMessageList () : object[] {
    return [
      {
        id: 'someIdAJFLkjkjd79',
        fullName: 'Jan Suzaka',
        firstName: 'Jan',
        lastName: 'Suzaka',
        messageReceivedOnDate: '10/25/2021',
        messageReceivedAtTime: '8:43 AM',
        messageText: 'I accept the appointment',
        appointmentAccepted: true
      },
      {
        id: '098X987lkjyasd',
        fullName: 'Tedward Platur',
        firstName: 'Tedward',
        lastName: 'Platur',
        messageReceivedOnDate: '10/24/2021',
        messageReceivedAtTime: '10:45 AM',
        messageText: 'I accept the appointment',
        appointmentAccepted: true
      },
      {
        id: '0asdlj*(^332',
        fullName: 'Goeftifer Christopherson',
        firstName: 'Goeftifer',
        lastName: 'Christopherson',
        messageReceivedOnDate: '10/23/2021',
        messageReceivedAtTime: '9:54 AM',
        messageText: 'I accept the appointment',
        appointmentAccepted: true
      }
    ]
  }

  get perPageOptions () : object[] {
    return [
      { value: 2, text: '2' },
      { value: 10, text: '10' },
      { value: 15, text: '15' },
      { value: 30, text: '30' },
      { value: this.messageList.length, text: 'All' }
    ]
  }

  private onPerPageSelect (perPage: number) : void {
    this.messagesPerPage = perPage
  }

  private onRowSelected (items: any) {
    this.selectedMessageRows = items
  }

  get getNumberOfMessagesReceivedInTimeInterval () : number[] {
    return this.numberOfMessagesInTimeInterval
  }

  // get numberOfMessagesSentInTimeInterval () : number[] {
  //   return this.numberOfMessagesReceivedInTimeInterval
  // }

  get getNumberOfMessagesWithAcceptedAppointmentsInTimeInterval () : number[] {
    this.getMessagesInTimeInterval().map((message: any) => {
      return message.appointmentAccepted === true
    })
    return [5, 6, 9, 3]
  }

  get messagesReceivedDataset () : object {
    return {
      label: 'Messages Received',
      borderColor: '#FC2525',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.getNumberOfMessagesReceivedInTimeInterval
    }
  }

  get messagesSentDataset () : object {
    return {
      label: 'Messages Sent',
      borderColor: '#04BCCF',
      pointBackgroundColor: '#52E1F0',
      borderWidth: 1,
      pointBorderColor: '#52E1F0',
      data: this.numberOfMessagesInTimeInterval
    }
  }

  get messagesOfAcceptedAppointmentsDataset () : object {
    return {
      label: 'Messages Received',
      borderColor: '#FC2525',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.getNumberOfMessagesWithAcceptedAppointmentsInTimeInterval
    }
  }

  get messagesOfCancelledAppointmentsDataset () : object {
    return {
      label: 'Messages Received',
      borderColor: '#FC2525',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: 'white',
      data: this.numberOfMessagesInTimeInterval
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
