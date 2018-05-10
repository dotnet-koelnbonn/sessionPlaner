import { GetterTree } from 'vuex';
import { IAppState } from '../maintypes';
import { ISpeakersState } from './types';

export const getters : GetterTree<ISpeakersState, IAppState> = {
    groups(state) {
        return state.groups;
      },
    currentSpeaker(state) {
        return state.speaker;
    }
}