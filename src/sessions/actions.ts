import { ActionTree } from "vuex";
import { IAppState, IDisplaySession } from "../maintypes";
import { ISessionState, ISessionGroup } from "./types";
import * as dataService from "../services/dataService";

async function createGroups(appState: IAppState): Promise<ISessionGroup[]> {
  const sessions = await appState.service.getDisplaySessions();
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

export const actions: ActionTree<ISessionState, IAppState> = {
  async loadGroups({ commit, state, rootState }) {
    if (state.groups && state.groups.length >0) {
        return;
    }
    const groups = await createGroups(rootState);
    commit("groupsLoaded", groups);
  },
  async loadSession({ commit, rootState }, id) {
    console.log("loadSession", id);
    const session = await rootState.service.findDisplaySession(id);
    commit("sessionLoaded", session);
  },
  async setFavorite({ commit, rootState, state }, id) {
    const session = await rootState.service.findDisplaySession(id);
    commit("favoriteToggle", session);
  }
};
