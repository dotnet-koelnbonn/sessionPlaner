import { MutationTree } from "vuex";
import { ISpeakersState, ISpeakerGroup } from "./types";
import { IDisplaySpeaker, IDisplaySession } from "@/maintypes";

export const mutations: MutationTree<ISpeakersState> = {
  groupsLoaded(state, groups: ISpeakerGroup[]) {
    state.groups = groups;
  },

  speakerLoaded(state, session: IDisplaySpeaker) {
    state.speaker = session;
  }

};
