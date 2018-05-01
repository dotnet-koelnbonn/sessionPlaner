<template>
  <div class="home">
   {{ title }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations } from 'vuex';

const namespace: string = 'home';

@Component({
  computed: mapGetters(namespace, ['title']),
  methods: mapActions(namespace, ['load'])
})
export default class Home extends Vue {
  mounted() {
    this.load();
    const ids = localStorage.getItem('dncFavorites');
    if (ids) {
      this.$router.push({name:'favorites'})
    } else {
      this.$router.push({name:'sessions'})
    }
  }
  load: any;
  title: string;
}
</script>
