import Vue from "vue";
import Vuex, { StoreOptions, Store } from "vuex";
import { IAppState, IDisplaySession } from "./maintypes";
import { home } from "./home/index";
import { speakers } from "./speakers/index";
import { sessions } from "./sessions/index";
import { favorites } from "./favorites/index";
import { ApiResultConverter } from "@/services/dataService";
import { stat } from "fs";
import  app from './app/index';


Vue.use(Vuex);


const storeFavorites = (store: Store<IAppState>) => {
  store.subscribe((mutatation, state) => {
    if (mutatation.type.endsWith('favoriteToggled')) {
      localStorage.setItem("dncFavorites", state.favoriteIds.toString());
    }
  });
};

const isDebug = window.location.href.indexOf('localhost') > 0;

const store: StoreOptions<IAppState> = {
  state: app.state,
  strict: isDebug,
  actions: app.actions,
  mutations: app.mutations,
  modules: {
    home,
    speakers,
    sessions,
    favorites
  },
  plugins: [storeFavorites]
};

export default new Vuex.Store(store);
