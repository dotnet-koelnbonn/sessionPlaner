import { GetterTree } from "vuex";
import { IAppState } from "../maintypes";
import { ISessionState } from "./types";

export const getters: GetterTree<ISessionState, IAppState> = {
  groups(state) {
    return state.groups;
  },
  currentSessions(state) {
    return state.sessions;
  }
};
