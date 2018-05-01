<template>
  <div v-if="session!=null" class="session">
    <div class="top">
        <router-link tag="div" :to="{ name: 'sessions'}"><i class="fas fa-2x fa-arrow-left"></i></router-link>
        <div>{{ session.track.title }}</div>

        <i v-if="!session.isFavorite"  v-on:click="toggle" class="far fa-2x fa-star"></i>
        <i v-if="session.isFavorite"  v-on:click="toggle" class="fas fa-2x fa-star"></i>
    </div>
    <h2 v-bind:style="{ 'background-color': session.track.color }">{{ session.title }} </h2>
    <div class="container">
    <div class="speakers">
           <SpeakerItem v-bind:speaker="speaker" v-for="speaker in session.speakers" v-bind:key="speaker.id" />      
    </div>
    <div>
        {{ session.fullTime }}<br/>
        {{ session.locationName }}
    </div>
    <p>
        {{ session.abstract }}
    </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations } from 'vuex';
import {IDisplaySession} from '@/maintypes';
import SpeakerItem from './SpeakerItem.vue';
import { sessions } from '@/sessions';
const namespace: string = 'sessions';

@Component({
  methods: mapActions(['loadSession','setFavorite']),
  computed: mapGetters(['session']),
  components:{SpeakerItem}
})
export default class Session extends Vue { 
  created() {
    this.fetchData();
  }
  loadSession: any;
  setFavorite : any;
  session!: IDisplaySession;
  fetchData() {
      const id = this.$route.params.id;
      this.loadSession(Number(id));
  }
  toggle() {
      this.setFavorite(Number(this.session.id));
  }
}
</script>

<style lang="scss">
.container {
    padding: 1em;
}
.session .top {
    display:flex;
    padding: 0.2em;
    flex-direction: row;
    justify-content: space-between;
}
.session h2 {
    padding: 0.2em;
    color: white;
    line-height: 1.8em;
    margin: 0;
}
.session .speakers a {
    margin-bottom: 0.8em;
    margin-right: 1em;
}
.session .speakers {
    display: flex;
    flex-flow: wrap;
}
</style>
