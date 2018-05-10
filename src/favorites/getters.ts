import { GetterTree } from "vuex";
import { IAppState } from "../maintypes";
import { IFavoritesState } from "./types";

export const getters: GetterTree<IFavoritesState, IAppState> = {
  groups(state) {
    return state.groups;
  }
};
