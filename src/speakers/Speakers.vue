<template>
  <div>
        <spinner v-if="groups.length === 0"/>
    <div v-if="groups.length > 0">

    <h2>Speakers</h2>
        <SpeakerGroups v-bind:groups="groups"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, Action } from "vuex-class";
import { ISpeakerGroup } from "./types";

import SpeakerGroups from "@/components/SpeakerGroups.vue";

const mod = namespace('speakers');

@Component({
  components: { SpeakerGroups }
})
export default class Speakers extends Vue {
  @Action initializeApplication:()=>void;
  @mod.Action loadGroups: ()=>void;
  @mod.Getter groups: ISpeakerGroup[];
  async mounted() {
    this.initializeApplication();
    await this.loadGroups();
  }
}
</script>
