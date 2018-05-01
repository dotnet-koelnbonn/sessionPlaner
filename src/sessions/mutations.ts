import { MutationTree } from 'vuex';
import { ISessionState, ISessionGroup } from './types';
import { IApiResult, ISession, IAppState, IDisplaySession } from '../maintypes';
import { sessions } from '@/sessions';
import { SSL_OP_ALL } from 'constants';
import * as moment from 'moment';
import * as services from './sessionService';
import * as dataService from '../services/dataService';

export interface ISessionData {
    rootState : IAppState,
    id : number;
}

export const mutations: MutationTree<ISessionState> = {
    
    groupsLoaded(state, groups : ISessionGroup[]) {
        console.log('groupsLoaded', groups);
        state.groups = groups;
    },

    sessionLoaded(state, session : IDisplaySession) {
        console.log('sessionLoaded', session.id);      
       state.sessions = [session]; 
    },

    async favoriteToggle(state, data : IDisplaySession) {
       data.isFavorite = !data.isFavorite;
    }
}