<template>
  <div>
    <spinner v-if="groups.length === 0"/>
    <div v-if="groups.length > 0">
    <h2>Sessions</h2>
    <SessionGroups v-bind:groups="groups"  v-on:toggle-favorite="toggle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ISessionGroup } from './types';
import {
  Getter,
  Action,
  namespace
} from 'vuex-class'

import SessionGroups from '@/components/SessionGroups.vue';

const mod = namespace('sessions');
@Component({
  components: {SessionGroups}
})
export default class Sessions extends Vue { 
  @mod.Action loadGroups: () => void;
  @mod.Action setFavorite: (id:number) => void;
  @mod.Getter groups: ISessionGroup[];
  
  async mounted() {
    await this.loadGroups();
  }
  toggle(sessionId : number) {
      this.setFavorite(sessionId);      
  }
}
</script>
