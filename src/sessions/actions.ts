import { ActionTree } from "vuex";
import { IAppState, IDisplaySession } from "../maintypes";
import { ISessionState, ISessionGroup } from "./types";
import * as dataService from "../services/dataService";

function createGroups(sessions : IDisplaySession[]): ISessionGroup[] {
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

function getSessionsForGroups(sessions: IDisplaySession[],  groupName: string): IDisplaySession[] {
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
   loadGroups({ commit, state, rootState }) {

    if (state.groups && state.groups.length >0) {
        return;
    }
    const groups = createGroups(rootState.loadedSessions);
    commit("groupsLoaded", groups);
  },
  async loadSession({ commit, rootState }, id) {
    const session = dataService.findDisplaySession(rootState.loadedSessions, id);
    commit("sessionLoaded", session);
  }

};
