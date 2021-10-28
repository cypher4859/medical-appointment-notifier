<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          Stuff 1
        </b-col>
        <b-col>
          Stuff 2
        </b-col>
        <b-col>
          Stuff 3
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'app'
})
export default class App extends Vue {
  //
}
</script>
