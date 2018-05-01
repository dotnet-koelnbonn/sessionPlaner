
import { Module } from 'vuex';
import { IAppState, IDisplaySpeaker } from '../maintypes';
import { ISpeakersState } from './types';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: ISpeakersState = {
    groups:[],
    speaker: <IDisplaySpeaker>{}
};

const namespaced: boolean = true;

export const speakers : Module<ISpeakersState, IAppState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};