<template>
  <div>
    <b-card>
      <div>
        <b-row>
          <b-col>
            <router-view />
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'visual-context-area'
})
export default class VisualContextArea extends Vue {
}
</script>
