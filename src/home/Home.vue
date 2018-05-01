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
  }
  load: any;
  title!: string;
}
</script>
