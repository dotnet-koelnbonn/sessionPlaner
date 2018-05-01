import { ActionTree } from "vuex";
import { IAppState, IDisplaySession } from "../maintypes";
import { IFavoritesState } from "./types";
import { ISessionGroup } from "@/sessions/types";

async function createGroups(appState: IAppState): Promise<ISessionGroup[]> {
  const sessions = (await appState.service.getDisplaySessions()).filter(
    s => s.isFavorite
  );
  const groupNames = sessions.map(s => s.groupName);
  const uniqueNames = groupNames
    .filter((elem, index, array) => array.indexOf(elem) === index)
    .sort();

  let groups: ISessionGroup[] = uniqueNames.map<ISessionGroup>(groupName => {
    return {
      name: groupName,
      sessions: getSessionsForGroups(sessions, groupName)
    };
  });

  return groups;
}

function getSessionsForGroups(
  sessions: IDisplaySession[],
  groupName: string
): IDisplaySession[] {
  const groupSessions = sessions
    .filter(s => s.groupName === groupName)
    .sort(compareItems);
  return groupSessions;
}

function compareItems(a: IDisplaySession, b: IDisplaySession): number {
  if (!a.trackName || !b.trackName) {
    return 0;
  }
  if (a.trackName < b.trackName) {
    return -1;
  }
  if (a.trackName > b.trackName) {
    return 1;
  }
  return 0;
}

export const actions: ActionTree<IFavoritesState, IAppState> = {
  async loadGroups({ commit, state, rootState }) {
    const groups = await createGroups(rootState);
    commit("groupsLoaded", groups);
  },
  async setFavorite({ commit, rootState, state }, id) {
    const session = await rootState.service.findDisplaySession(id);
    commit("favoriteToggle", session);
  }
};
