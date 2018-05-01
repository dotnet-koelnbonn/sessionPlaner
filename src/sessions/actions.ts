import { ActionTree } from 'vuex';
import { IAppState } from '../maintypes';
import { ISessionState } from './types';
import * as dataService from '../services/dataService';

export const actions : ActionTree<ISessionState, IAppState> = {
    async loadSessions({commit, rootState}) {
        if (await dataService.loadData(rootState)) {
            commit('dataLoaded', rootState);
        }
    },
    async loadSession({commit, rootState}, id) {
        if (await dataService.loadData(rootState)) {
            console.log('loadSession', id)
            commit('sessionLoaded',{ rootState : rootState, id : id});
        }
    },
    setFavorite({commit, rootState, state}, id) {
        commit('favoriteToggle', { rootState : rootState, id : id});
    }
}