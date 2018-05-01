
import { IAppState } from '../maintypes';

export async function toogleFavorite(appState :IAppState, sessionId: number) {
    if (!appState.service) {
        return;
    }
    let isFavorite = false;
    const index = appState.favoriteIds.indexOf(sessionId);
    if (index < 0) {
        appState.favoriteIds.push(sessionId);
        isFavorite = true;
    }  else {
        appState.favoriteIds.splice(index, 1);
    }
    const session = await appState.service.findDisplaySession(sessionId);
    if (session != null) {
        session.isFavorite = isFavorite;
    }
    return isFavorite;
}