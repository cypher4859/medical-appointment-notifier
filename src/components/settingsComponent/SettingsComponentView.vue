<template>
  <div>
    <b-container>
      <div>
        <b-row>
          <b-col>
            <settings-home />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SettingsHome from './render/SettingsHome.vue'

@Component({
  name: 'SettingsComponentView',
  components: {
    'settings-home': SettingsHome
  }
})
export default class SettingsComponentView extends Vue {
}
</script>
