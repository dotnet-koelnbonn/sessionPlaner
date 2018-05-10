import { ActionTree } from "vuex";
import { IAppState, IDisplaySpeaker } from "../maintypes";
import { ISpeakersState, ISpeakerGroup } from "./types";
import { findDisplaySpeaker, findDisplaySession } from "@/services/dataService";

function createGroups(speakers: IDisplaySpeaker[]): ISpeakerGroup[] {
  const groupNames = speakers.map(s => s.groupName);
  const uniqueNames = groupNames
    .filter((elem, index, array) => array.indexOf(elem) === index)
    .sort();

  let groups: ISpeakerGroup[] = uniqueNames.map<ISpeakerGroup>(groupName => {
    return {
      name: groupName,
      speakers: getSpeakersForGroup(speakers, groupName)
    };
  });

  return groups;
}

function getSpeakersForGroup(
  sessions: IDisplaySpeaker[],
  groupName: string
): IDisplaySpeaker[] {
  const groupSessions = sessions
    .filter(s => s.groupName === groupName)
    .sort(compareItems);
  return groupSessions;
}

function compareItems(a: IDisplaySpeaker, b: IDisplaySpeaker): number {
  if (!a.name || !b.name) {
    return 0;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
export const actions: ActionTree<ISpeakersState, IAppState> = {
  loadGroups({ commit, state, rootState }) {
    if (state.groups && state.groups.length > 0) {
      return;
    }
    const groups = createGroups(rootState.loadedSpeakers);
    commit("groupsLoaded", groups);
  },
  loadSpeaker({ commit, rootState }, id) {
    const speaker = findDisplaySpeaker(rootState.loadedSpeakers, id);
    commit("speakerLoaded", speaker);
  },
  setFavorite({ commit, rootState, state }, id) {
    const session = findDisplaySession(rootState.loadedSessions, id);
    commit("favoriteToggle", session);
  }
};
