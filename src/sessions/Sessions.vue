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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ISessionGroup } from './types';

import SessionGroups from '@/components/SessionGroups.vue';

@Component({
  methods: mapActions('sessions', ['setFavorite', 'loadGroups']),
  computed: mapGetters('sessions', ['groups']),
  components: {SessionGroups}
})
export default class Sessions extends Vue { 
  loadGroups: any;
  setFavorite: any;
  groups: ISessionGroup[];
  async mounted() {
    await this.loadGroups();
  }
  toggle(sessionId : number) {
      this.setFavorite(sessionId);      
  }
}
</script>
