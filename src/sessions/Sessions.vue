<template>
  <div>
    <h2>Sessions</h2>
    <SessionGroups v-bind:groups="groups"  v-on:toggle-favorite="toggle"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ISessionGroup } from './types';
import SessionGroups from '@/components/SessionGroups.vue';

const namespace: string = 'sessions';

@Component({
  methods: mapActions(['loadSessions','setFavorite']),
  computed: mapGetters(['groups']),
  components: {SessionGroups}
})
export default class Sessions extends Vue { 
  mounted() {
    this.loadSessions();
  }
  loadSessions: any;
  setFavorite: any;
  groups!: ISessionGroup[];
  toggle(sessionId : number) {
      this.setFavorite(sessionId);      
  }

}
</script>
