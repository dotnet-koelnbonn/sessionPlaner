import Vue from 'vue';
import Vuex, { StoreOptions, Store } from 'vuex';
import { IAppState } from './maintypes';
import { home } from './home/index';
import { speakers } from './speakers/index';
import { sessions } from './sessions/index';
import { favorites } from './favorites/index';

const url = 'https://dotnetcologne.azurewebsites.net/api/app/2083?imageUrl=yes';

Vue.use(Vuex);
const storeFavorites = (store : Store<IAppState> ) => {
  store.subscribe((mutatation, state)=> {
      if (mutatation.type === 'favoriteToggle') {
        localStorage.setItem("dncFavorites", state.favoriteIds.toString());
      }
  })
}

const store : StoreOptions<IAppState> = {
  state:  {
    apiUrl: url,    
    favoriteIds: []
  },
  strict: false,
  modules: {
    home,
    speakers,
    sessions,
    favorites
  },
  plugins: [storeFavorites]
}



export default new Vuex.Store(store);