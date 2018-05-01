
import { Module } from 'vuex';
import { IAppState } from '../maintypes';
import { IFavoritesState } from './types';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: IFavoritesState = {
    groups: []
};

const namespaced: boolean = true;

export const favorites : Module<IFavoritesState, IAppState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};