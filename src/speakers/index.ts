
import { Module } from 'vuex';
import { IAppState } from '../maintypes';
import { ISpeakersState } from './types';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: ISpeakersState = {
};

const namespaced: boolean = true;

export const speakers : Module<ISpeakersState, IAppState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};