import { MutationTree } from 'vuex';
import { ISpeakersState, ISpeakerGroup } from './types';
import { IDisplaySpeaker, IDisplaySession } from '@/maintypes';

export const mutations : MutationTree<ISpeakersState> = {
        
    groupsLoaded(state, groups : ISpeakerGroup[]) {
        console.log('groupsLoaded', groups);
        state.groups = groups;
    },

    speakerLoaded(state, session : IDisplaySpeaker) {
       console.log('speakerLoaded', session.id);      
       state.speaker = session; 
    },
     favoriteToggle(state, data : IDisplaySession) {
        data.isFavorite = !data.isFavorite;
     }
}