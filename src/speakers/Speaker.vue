<template>
<div  class="speaker">
   <spinner v-if="!currentSpeaker.id"/>
  <div v-if="currentSpeaker.id">
  <div class="top">
    <div tag="div" v-on:click="back"><i class="fas fa-2x fa-arrow-left"></i></div>
    <div>{{currentSpeaker.name }}</div>
    <div></div>
  </div>
  <div class="container">
    <div class="item">
    <img v-bind:src="currentSpeaker.imageUrl" />
    <h2>{{ currentSpeaker.name }}</h2>
   </div>
   <p>
     {{ currentSpeaker.bio }}
     </p>
     <h3>Sessions</h3>
    <div class="sessions">
       <SessionItem v-bind:session="session" v-for="session in currentSpeaker.sessions" v-bind:key="session.id"  v-on:toggle-favorite="toggle"/>      
    </div>
  </div>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SessionItem from "@/components/SessionItem.vue";
import { IDisplaySpeaker } from "@/maintypes";

const mod = namespace('speakers');

@Component({
  components: { SessionItem }
})
export default class Speaker extends Vue {
  @mod.Action loadSpeaker: (id:number)=>void;
  @mod.Action setFavorite: (id:number)=>void;
  @mod.Getter currentSpeaker: IDisplaySpeaker;

  async mounted() {
    const id = this.$route.params.id;
    await this.loadSpeaker(Number(id));
  }

  toggle(id) {
    this.setFavorite(id);
  }
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 1em;
}
.speaker .top {
  display: flex;
  padding: 0.2em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;  
}

.item {
  display: flex;
  padding: 1em;
  flex-direction: row;
  align-items: center;  
}

  img {
    margin-right: 1em;
    width: 8em;
    height: 8em;
        border-radius: 50%;
  }
</style>