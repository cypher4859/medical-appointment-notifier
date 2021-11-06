<template>
  <div>
    <b-button
      class="px-5"
      :to="linkTo"
    >
      <div>
        <b-row>
          <b-col
            v-if="iconName"
            cols="1"
          >
            <b-icon
              :icon="iconName"
            />
          </b-col>
          <b-col>
            {{ buttonText }}
          </b-col>
        </b-row>
      </div>
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'list-button'
})
export default class ListButton extends Vue {
  @Prop(String) private buttonText!: string
  @Prop(String) private iconName!: string
  @Prop({ default: '', type: String }) private linkTo!: string
}
</script>
