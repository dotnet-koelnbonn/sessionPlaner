<template>
<div class="speakers">
  <div v-for="group in groups" v-bind:key="group.name">
       <h2>{{group.name}}</h2>
       <SpeakerItem v-bind:speaker="speaker" v-for="speaker in group.speakers" v-bind:key="speaker.id" v/>         
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISpeakerGroup } from "../speakers/types";
import SpeakerItem from "./SpeakerItem.vue";

@Component({
  components: { SpeakerItem }
})
export default class SpeakerGroups extends Vue {
  @Prop() groups: ISpeakerGroup[];
}
</script>

<style lang="scss">
.speakers h2 {
  background-color: lightgray;
  margin: 0 0 1em 0;
  padding: 0.2em;
}
.speakers .speaker-item {
  margin-bottom: 1em;
}
</style>

