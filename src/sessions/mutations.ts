import { MutationTree } from 'vuex';
import { ISessionState, ISessionGroup } from './types';
import { IApiResult, ISession, IAppState, IDisplaySession } from '../maintypes';
import { sessions } from '@/sessions';
import { SSL_OP_ALL } from 'constants';
import * as moment from 'moment';
import * as services from './sessionService';

function createGroups(appState: IAppState): ISessionGroup[] {
    if (!appState.service) {
        return [];
    }

    const sessions = appState.service.getDisplaySessions();
    const groupNames = sessions.map(s => s.groupName);
    const uniqueNames = groupNames.filter((elem, index, array) => array.indexOf(elem) === index).sort();

    let groups: ISessionGroup[] = uniqueNames.map<ISessionGroup>(groupName => {
        return {
            name: groupName,
            sessions: getSessionsForGroups(sessions, groupName)
        }
    })

    return groups;
}

function getSessionsForGroups(sessions: IDisplaySession[], groupName: string): IDisplaySession[] {

     const groupSessions = sessions
     .filter(s => s.groupName === groupName)
     .sort(compareItems)
    return groupSessions;
}

function compareItems(a: IDisplaySession, b : IDisplaySession) : number{
    if (!a.trackName || !b.trackName) {
        return 0;
    }
    if (a.trackName < b.trackName) {
        return -1;
    }
    if (a.trackName > b.trackName) {
        return 1;
    }
    return 0;
}

function getLocation(data: IApiResult, session: ISession): string {
    const locations = data.locations.filter(l=>l.id === session.locationId).map(m => m.name);
    if (locations.length === 0) {
        return '-';
    }
    return locations[0];
}

function getTrackData(data: IApiResult, session: ISession): any {
    var tracks = data.tracks.filter(t => t.id === session.trackId);
    if (tracks.length === 0) {
        return '-';
    }
    return {
        name: tracks[0].shortTitle,
        color: tracks[0].color,
        fullName : tracks[0].title
    };
}
function getTime(session : ISession) : string {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const day = days[session.beginLocal.getDay()];
    return day + " " + session.groupName;
}


export interface ISessionData {
    rootState : IAppState,
    id : number;
}
export const mutations: MutationTree<ISessionState> = {
    dataLoaded(state, payload: IAppState) {
        state.groups = createGroups(payload);
    },
    sessionLoaded(state, data : ISessionData) {
        if (!data.rootState.service) {
            return;
        }
        const session = data.rootState.service.findDisplaySession(data.id);
        if (session != null) {
            state.session = session;
        }
    },
    favoriteToggle(state, data : ISessionData) {
        const isFavorite = services.toogleFavorite(data.rootState, data.id);
 
    }

}