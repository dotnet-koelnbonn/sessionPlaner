import { MutationTree } from 'vuex';
import { IFavoritesState } from './types';
import { IDisplaySession } from '@/maintypes';
import { ISessionGroup } from '@/sessions/types';

export const mutations : MutationTree<IFavoritesState> = {
        
    groupsLoaded(state, groups : ISessionGroup[]) {
        console.log('groupsLoaded', groups);
        state.groups = groups;
    },

    async favoriteToggle(state, data : IDisplaySession) {
        data.isFavorite = !data.isFavorite;
     }
}