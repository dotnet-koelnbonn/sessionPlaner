<template>
  <div>
    <h2>Speaker</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {mapActions, mapGetters, mapMutations } from 'vuex';

const namespace: string = 'speakers';

@Component({
})
export default class Speaker extends Vue {
}
</script>
