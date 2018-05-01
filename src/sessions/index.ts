
import { Module } from 'vuex';
import { IAppState } from '../maintypes';
import { ISessionState } from './types';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: ISessionState = {
    groups: [],
    sessions: []
};

const namespaced: boolean = true;

export const sessions : Module<ISessionState, IAppState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};