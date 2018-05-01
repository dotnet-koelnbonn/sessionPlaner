<template>
  <div>
    <spinner v-if="groups.length === 0"/>
    <div v-if="groups.length > 0">
    <h2>Favoriten</h2>
    <SessionGroups v-bind:groups="groups"  v-on:toggle-favorite="toggle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ISessionGroup } from "@/sessions/types";

import SessionGroups from "@/components/SessionGroups.vue";
const namespace: string = "favorites";

@Component({
  methods: mapActions(namespace, ["setFavorite", "loadGroups"]),
  computed: mapGetters(namespace, ["groups"]),
  components: { SessionGroups }
})
export default class Favorites extends Vue {
  loadGroups: any;
  setFavorite: any;
  groups: ISessionGroup[];
  async mounted() {
    await this.loadGroups();
  }
  async toggle(sessionId: number) {
    await this.setFavorite(sessionId);
  }
}
</script>
