import { GetterTree } from 'vuex';
import { IAppState } from '../maintypes';
import { IHomeState } from './types';

export const getters : GetterTree<IHomeState, IAppState> = {
    title(state) {
        return state.title;
    }
}