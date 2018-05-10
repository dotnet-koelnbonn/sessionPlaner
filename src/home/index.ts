
import { Module } from 'vuex';
import { IAppState } from '../maintypes';
import { IHomeState } from './types';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: IHomeState = {
    title: 'Not Loaded'
};

export const home : Module<IHomeState,IAppState> = {
    state,
    getters,
    actions,
    mutations
};