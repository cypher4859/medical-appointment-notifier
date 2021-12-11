<template>
  <div>
    <b-navbar>
      <b-navbar-brand>
        Brand of Valhalla
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-for="(button, index) in actionButtons"
          :key="index"
          :to="button.routeToComponent"
        >
          {{ button.text }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'navigation-bar'
})
export default class NavigationBar extends Vue {
  @Prop(Array) private actionButtons!: object[]

  private navigationItems = ['item1', 'item2', 'item3', 'item4']
}
</script>
