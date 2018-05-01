<template>
  <div>
    <h2>Favoriten</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations } from 'vuex';

const namespace: string = 'home';

@Component({
})
export default class Favorites extends Vue {
}
</script>
