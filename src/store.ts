import Vue from "vue";
import Vuex, { StoreOptions, Store } from "vuex";
import { IAppState, IDisplaySession } from "./maintypes";
import { home } from "./home/index";
import { speakers } from "./speakers/index";
import { sessions } from "./sessions/index";
import { favorites } from "./favorites/index";
import { ApiResultConverter } from "@/services/dataService";
import { stat } from "fs";

const url = "https://dotnetcologne.azurewebsites.net/api/app/2083?imageUrl=yes";

Vue.use(Vuex);

function storeState(appState: IAppState, session: IDisplaySession) {
  let isFavorite = session.isFavorite;
  const index = appState.favoriteIds.indexOf(session.id);

  if (isFavorite && index >= 0) {
    return;
  }
  if (!isFavorite && index >= 0) {
    appState.favoriteIds.splice(index, 1);
    return;
  }
  if (isFavorite && index < 0) {
    appState.favoriteIds.push(session.id);
  }
}
const storeFavorites = (store: Store<IAppState>) => {
  store.subscribe((mutatation, state) => {
    if (mutatation.type.endsWith('favoriteToggle')) {
      const session = mutatation.payload as IDisplaySession;
      storeState(state, session);
      localStorage.setItem("dncFavorites", state.favoriteIds.toString());
    }
  });
};

const state: IAppState = {
  apiUrl: url,
  favoriteIds: [],
  service: null
};
state.service = new ApiResultConverter(state);

console.log("rootState", state);

const store: StoreOptions<IAppState> = {
  state: state,
  strict: false,
  modules: {
    home,
    speakers,
    sessions,
    favorites
  },
  plugins: [storeFavorites]
};

export default new Vuex.Store(store);
