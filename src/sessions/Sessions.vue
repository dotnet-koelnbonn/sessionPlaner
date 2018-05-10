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
  Action,
  namespace
} from 'vuex-class'

import SessionGroups from '@/components/SessionGroups.vue';

const mod = namespace('sessions');
@Component({
  components: {SessionGroups}
})
export default class Sessions extends Vue { 
  @Action initializeApplication:()=>void;
  @mod.Action loadGroups: () => void;
  @Action toogleFavorite: (id:number) => void;
  @mod.Getter groups: ISessionGroup[];
  
  async created() {
    await this.initializeApplication();
    await this.loadGroups();
  }
  toggle(sessionId : number) {
      this.toogleFavorite(sessionId);      
  }
}
</script>
