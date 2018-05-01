import { GetterTree } from "vuex";
import { IAppState } from "../maintypes";
import { ISessionState } from "./types";

export const getters: GetterTree<ISessionState, IAppState> = {
  groups(state) {
    console.log("get groups");
    return state.groups;
  },
  currentSessions(state) {
    console.log("get session");
    return state.sessions;
  }
};
