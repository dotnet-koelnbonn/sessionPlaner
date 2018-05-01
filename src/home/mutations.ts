import { MutationTree } from 'vuex';
import { IHomeState } from './types';
import { IAppState } from '../maintypes';

export const mutations : MutationTree<IHomeState> = {
    dataLoaded(state, payload: IAppState) {
        console.log('mutations-home', state, payload);
    }
}