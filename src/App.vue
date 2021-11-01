<template>
  <div>
    <b-container fluid>
      <primary-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import PrimaryView from './components/PrimaryView.vue'

@Component({
  name: 'app',
  components: {
    'primary-view': PrimaryView
  }
})
export default class App extends Vue {
  //
}
</script>
