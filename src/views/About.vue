<template>
  <div class="about">
  <div class="top">
        <div tag="div" v-on:click="back"><i class="fas fa-2x fa-arrow-left"></i></div>
        <div>Informationen</div>
        <div></div>
    </div>
  <div class="container">

  <h3><a href="https://dotnet-cologne.de">https://dotnet-cologne</a></h3>
  <h3><a href="https://twitter.com/dotnetCologne/">@dotnetCologne</a></h3>
  <h3><a href="https://twitter.com/search?f=tweets&vertical=default&q=%23dncgn&src=typd">#dncgn</a></h3>
  <h3>Location</h3>
  <p>KOMED<br>Im Mediapark 8<br>50670 Köln</p>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class About extends Vue {

  back() {
    this.$router.back();
  }
}
</script>

<style  lang="scss" scoped>
.container {
  padding: 1em;
}
.about .top {
  display: flex;
  padding: 0.2em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

