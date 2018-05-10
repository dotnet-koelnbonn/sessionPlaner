<template>
  <div class="mainscreen">
    <header>
    
    </header>
    <main>
        <router-view/>
    </main>
    <footer>
      <div class="navigation ">
      <div>
      <router-link class="button" to="/favorites"><i class="fas fa-2x fa-star"></i><br/>Favoriten</router-link>
      </div>
      <div>
      <router-link class="button" to="/sessions"><i class="fas fa-2x fa-clipboard-list"></i><br/>Sessions</router-link> 
      </div>
      <div>
      <router-link class="button" to="/speakers"><i class="fas fa-2x fa-users"></i><br/>Sprecher</router-link> 
      </div>
      <div>
      <router-link class="button" to="/about"><i class="fas fa-2x fa-info-circle"></i><br/>About</router-link>
      </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
body,
html {
  font-family: "Open Sans", sans-serif;
}
html,
body,
.mainscreen {
  height: 100%; /* needed for proper layout */
}
body {
  overflow: hidden;
}
.mainscreen {
  display: flex;
  flex-direction: column;
  height: 100%; /* needed for proper layout */
}
header {
  flex: 0 0 auto;
  background-color: #dcdcdc;
}
main {
  flex: 1 1 auto;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
footer {
  flex: 0 0 auto;
  background-color: rgb(81, 88, 132);
  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  div {
    text-align: center;
    padding: 0.2em;
    a {
      color: lightgray;
      text-decoration: none;
    }
    .router-link-active {
      color: white;
    }
  }
}

</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ActionTree } from "vuex";
import { Action } from "vuex-class";

@Component
export default class App extends Vue {
}
</script>

