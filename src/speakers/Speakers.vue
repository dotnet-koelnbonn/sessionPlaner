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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ISpeakerGroup } from "./types";

import SpeakerGroups from "@/components/SpeakerGroups.vue";

const namespace: string = "speakers";

@Component({
  methods: mapActions(namespace, ["loadGroups"]),
  computed: mapGetters(namespace, ["groups"]),
  components: { SpeakerGroups }
})
export default class Speakers extends Vue {
  loadGroups: any;
  groups: ISpeakerGroup[];
  async mounted() {
    await this.loadGroups();
  }
}
</script>
