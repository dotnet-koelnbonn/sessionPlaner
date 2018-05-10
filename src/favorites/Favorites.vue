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
import { ISessionGroup } from "@/sessions/types";
import {
  Getter,
  Action,
  namespace
} from 'vuex-class'
import SessionGroups from "@/components/SessionGroups.vue";


const mod = namespace('favorites')

@Component({
  components: { SessionGroups }
})
export default class Favorites extends Vue {
  @Action initializeApplication:()=>void;
  @mod.Action loadGroups: () => void;
  @Action toogleFavorite: (id:number) => void;
  @mod.Getter groups: ISessionGroup[];
  async mounted() {
    await this.initializeApplication();
    await this.loadGroups();
  }
  async toggle(sessionId: number) {
    await this.toogleFavorite(sessionId);
  }
}
</script>
