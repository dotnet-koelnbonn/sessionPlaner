import { ActionContext, ActionTree, MutationTree } from "vuex";

import { IAppState, IDisplaySession } from "@/maintypes";

import * as dataService from "@/services/dataService";

let applicationInitialized = false;

let initializing = false;

const actions: ActionTree<IAppState, IAppState> = {
  async initializeApplication({ commit, state, rootState }) {
    if (initializing) {
      return;
    }
    if (rootState.loadedSessions.length > 0) {
      return;
    }
    initializing = true;
    const service = new dataService.ApiResultConverter(rootState.apiUrl);
    const sessions = await service.getDisplaySessions();
    const speakers = await service.getDisplaySpeakers();
    commit("applicationInitialized", { sessions, speakers });
    initializing = false;
  },
  async toogleFavorite({ commit, rootState, state }, id) {
    const session = await dataService.findDisplaySession(rootState.loadedSessions, id);
    commit("favoriteToggled", session);
  }
};

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
const mutations: MutationTree<IAppState> = {
  applicationInitialized(state: IAppState, { sessions, speakers }) {
    state.loadedSessions = sessions;
    state.loadedSpeakers = speakers;
    const ids = localStorage.getItem("dncFavorites");
    if (ids) {
      state.favoriteIds = ids.split(",").map(id => Number(id));
      for (const session of sessions) {
        session.isFavorite = state.favoriteIds.indexOf(session.id) >= 0;
      }
    }
  },
  favoriteToggled(state, session: IDisplaySession) {
    session.isFavorite = !session.isFavorite;
    storeState(state, session);
  }
};

const url = "https://dotnetcologne.azurewebsites.net/api/app/2083?imageUrl=yes";

const state: IAppState = {
  apiUrl: url,
  favoriteIds: [],
  loadedSessions: [],
  loadedSpeakers: []
};

export default {
  actions,
  mutations,
  state
};
