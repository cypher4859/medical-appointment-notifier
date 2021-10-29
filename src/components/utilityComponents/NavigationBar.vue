<template>
  <div>
    <b-navbar
      type="dark"
      variant="info"
      toggleable="lg"
      sticky
    >
      <b-navbar-brand class="ml-auto">Brand</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(item, index) in navigationItems"
            :key="index"
          >
            {{ item }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
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
