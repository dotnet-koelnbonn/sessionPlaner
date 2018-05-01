import { ActionTree } from "vuex";
import { IAppState, IDisplaySpeaker } from "../maintypes";
import { ISpeakersState, ISpeakerGroup } from "./types";

async function createGroups(appState: IAppState): Promise<ISpeakerGroup[]> {
  const speakers = await appState.service.getDisplaySpeakers();
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
  async loadGroups({ commit, state, rootState }) {
    if (state.groups && state.groups.length > 0) {
      return;
    }
    console.log("loadGroups");
    const groups = await createGroups(rootState);
    commit("groupsLoaded", groups);
  },
  async loadSpeaker({ commit, rootState }, id) {
    console.log("loadSpeaker", id);
    const speaker = await rootState.service.findDisplaySpeaker(id);
    commit("speakerLoaded", speaker);
  },
  async setFavorite({ commit, rootState, state }, id) {
    const session = await rootState.service.findDisplaySession(id);
    commit("favoriteToggle", session);
  }
};
