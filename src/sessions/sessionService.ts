
import { IAppState } from '../maintypes';
import { findDisplaySession } from "@/services/dataService";

export async function toogleFavorite(appState :IAppState, sessionId: number) {
    let isFavorite = false;
    const index = appState.favoriteIds.indexOf(sessionId);
    if (index < 0) {
        appState.favoriteIds.push(sessionId);
        isFavorite = true;
    }  else {
        appState.favoriteIds.splice(index, 1);
    }
    const session = findDisplaySession(appState.loadedSessions, sessionId);
    if (session != null) {
        session.isFavorite = isFavorite;
    }
    return isFavorite;
}