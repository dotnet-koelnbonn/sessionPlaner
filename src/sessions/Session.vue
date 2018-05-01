<template>
<div>
      <spinner v-if="currentSessions.length === 0"/>
  <div v-for="current in currentSessions" v-bind:key="current.id" class="session">
    <div class="top">
        <div tag="div" v-on:click="back"><i class="fas fa-2x fa-arrow-left"></i></div>
        <div>{{ current.track.title }}</div>
        <i v-if="!current.isFavorite"  v-on:click="toggle" class="far fa-2x fa-star"></i>
        <i v-if="current.isFavorite"  v-on:click="toggle" class="fas fa-2x fa-star"></i>
    </div>
    <h2 v-bind:style="{ 'background-color': current.track.color }">{{ current.title }} </h2>
    <div class="container">
    <div class="speakers">
           <SpeakerItem v-bind:speaker="speaker" v-for="speaker in current.speakers" v-bind:key="speaker.id" />      
    </div>
    <div>
        {{ current.fullTime }}<br/>
        {{ current.locationName }}
    </div>
    <p>
        {{ current.abstract }}
    </p>
    </div>
  </div>
</div>  
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { IDisplaySession } from "@/maintypes";
import SpeakerItem from "@/components/SpeakerItem.vue";

@Component({
  methods: mapActions("sessions", ["loadSession", "setFavorite"]),
  computed: mapGetters("sessions", ["currentSessions"]),
  components: { SpeakerItem }
})
export default class Session extends Vue {
  loadSession: any;
  setFavorite: any;
  currentSessions: IDisplaySession[];
  async mounted() {
    const id = this.$route.params.id;
    await this.loadSession(Number(id));
  }
  toggle() {
    this.setFavorite(Number(this.currentSessions[0].id));
  }
  back() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 1em;
}
.session .top {
  display: flex;
  padding: 0.2em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
