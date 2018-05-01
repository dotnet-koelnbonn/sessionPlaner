<template>
<div class="sessions">
  <div v-for="group in groups" v-bind:key="group.name">
       <h2>{{group.name}}</h2>
       <SessionItem v-bind:session="session" v-for="session in group.sessions" v-bind:key="session.Id" v-on:toggle-favorite="toggle"/>         
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISessionGroup } from "../sessions/types";
import SessionItem from "./SessionItem.vue";

@Component({
  components: { SessionItem }
})
export default class SessionGroups extends Vue {
  @Prop() groups!: ISessionGroup[];
  toggle(sessionId:number) {
    this.$emit('toggle-favorite', sessionId);
  }
}
</script>

<style lang="scss">
.sessions h2 {
  background-color: lightgray;
  margin: 0;
  padding: 0.2em;
}
</style>

