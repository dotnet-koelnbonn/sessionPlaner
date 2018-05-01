import { ActionTree } from 'vuex';
import { IAppState } from '../maintypes';
import { IHomeState } from './types';
import * as dataService from '../services/dataService';

export const actions : ActionTree<IHomeState, IAppState> = {
    async load({commit, rootState}) {
        if (await dataService.loadData(rootState)) {
            commit('dataLoaded', rootState);
        }
    }
}