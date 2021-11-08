<template>
  <div>
    <b-card>
      <b-card-title>
        Messaging Monitor Dashboard
      </b-card-title>
      <b-row>
        <b-col>
          <b-card>
            <b-card-sub-title>Messages Received</b-card-sub-title>
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
                  id="data-table-search"
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
              <b-col>
                <strong class="mx-3">Items per Page:</strong>
                <b-form-select
                  v-model="perPageSelect"
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
import { Component } from 'vue-property-decorator'

@Component({
  name: 'messaging-monitor-dashboard'
})
export default class MessagingMonitoringDashboard extends Vue {
  private selectedMessageRows = []
  private messageList: object[] = this.getMessageList
  private tableSearchCriteria: string = ''
  private perPageSelect: number = 10
  private messagesPerPage: number = this.perPageSelect
  private currentMessageListPage: number = 1

  get getMessageList () : object[] {
    return [
      {
        id: 'someIdAJFLkjkjd79',
        patientName: 'Jan Suzaka',
        receivedOnDate: '02/20/2022',
        receivedAtTime: '8:43 AM',
        messageText: 'I accept the appointment',
        appointmentAccepted: true
      },
      {
        id: '098X987lkjyasd',
        patientName: 'Tedward Platur',
        receivedOnDate: '05/23/2022',
        receivedAtTime: '10:45 AM',
        messageText: 'I accept the appointment',
        appointmentAccepted: true
      },
      {
        id: '0asdlj*(^332',
        patientName: 'Goeftifer',
        receivedOnDate: '06/21/2022',
        receivedAtTime: '9:54 AM',
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
}
</script>
