<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="ml-auto mx-4 my-4 pb-2">
        Brand of Valhalla
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'navigation-bar'
})
export default class NavigationBar extends Vue {
  private navigationItems = ['item1', 'item2', 'item3', 'item4']
}
</script>
