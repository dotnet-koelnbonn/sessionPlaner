<template>
<div class="session-item">
<router-link :to="{ name: 'onesession', params: { id: session.id }}" tag="div" class="data">
      <h3>{{ session.title }}</h3>
      <div class="speaker" v-for="speaker in session.speakers" v-bind:key="speaker.id" >{{ speaker.name }}</div>
      <span class="location">{{ session.location.name }}</span>
</router-link>
  <div class="right">
    <div class=" favorite">
        <i v-if="!session.isFavorite" v-on:click="toggle" class="far fa-2x fa-star"></i>
        <i v-if="session.isFavorite" v-on:click="toggle" class="fas fa-2x fa-star"></i>
    </div>
    <div class="track" v-bind:style="{ 'background-color': session.track.color }" >
      {{ session.track.shortTitle }}<br/>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDisplaySession } from "@/maintypes";

@Component
export default class SessionItem extends Vue {

  @Prop({default:{}})
  private session: IDisplaySession;

 toggle() {
    this.$emit('toggle-favorite', this.session.id);
 }

}
</script>

<style lang="scss">
.session-item {
  border: 1px lightgray solid;
  display: flex;
  flex-direction: row;
  .data {
    padding: 0.2em;
    a {
      text-decoration: none;
      color: black;
    }
    flex-grow: 1;
  }
  h3 {
    font-size: 1.05em;
    margin: 0;
  }
  .location {
    font-weight: bold;
  }  
  .track {
    color: white;
    font-weight: bold;
    height: 100%;
    width: 2em;
    vertical-align: middle;
    align-self: center;
    text-align: center;
    
  }
  .right {
    margin-left: auto;
    display: flex;
    flex-flow:row;
    align-items: center;
  }

}
</style>