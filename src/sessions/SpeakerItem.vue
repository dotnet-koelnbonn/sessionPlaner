<template>
<router-link class="speaker-item" :to="{name:'speaker', params:{id: speaker.id}}">
  <img v-bind:src="speaker.imageUrl" />
  {{ speaker.name }}
</router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDisplaySpeaker } from "../maintypes";

@Component
export default class SpeakerItem extends Vue {
  /**
   *
   */
  constructor() {
    super();
  }
  @Prop() 
  private speaker!: IDisplaySpeaker;

}
</script>

<style lang="scss">
.speaker-item {
  display: flex;
  flex-flow: row;
  align-items: center;
  img {
    width: 4em;
    height: 4em;
        border-radius: 50%;
  }
}
</style>