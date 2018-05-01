import { GetterTree } from 'vuex';
import { IAppState } from '../maintypes';
import { ISpeakersState } from './types';

export const getters : GetterTree<ISpeakersState, IAppState> = {
    groups(state) {
        console.log("get groups");
        return state.groups;
      },
    currentSpeaker(state) {
        console.log("get currentSpeaker");
        return state.speaker;
    }
}