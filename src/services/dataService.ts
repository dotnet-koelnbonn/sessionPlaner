
import * as types from '../maintypes';
import * as moment from 'moment';



export async function loadData(rootState: types.IAppState) : Promise<boolean> {
    if (!rootState.service) {
        try {

            const result = await fetch(rootState.apiUrl);
            const json = await result.json();
            const converter = new ApiResultConverter(json);
            rootState.service = converter;
            const values = localStorage.getItem('dncFavorites') || "";
            rootState.favoriteIds = values.split(',').map(n=>Number(n)); 
            converter.updateFavorites(rootState.favoriteIds);
        } catch {
            return false;
        }
    }
    return true;
}


export class ApiResultConverter {
    
    constructor(private data : types.IApiResult) {
        
    }
    private _displaySessions : types.IDisplaySession[] = [];
    private _displaySpeakers :{ [id: number] : types.IDisplaySpeaker; } = {};
    private _displayLocations :{ [id: number] : types.IDisplayLocation; } = {};
    private _displayTracks :{ [id: number] : types.IDisplayTrack; } = {};

    findDisplaySession(sessionId: number) {
        const sessions = this.getDisplaySessions().filter(s=>s.id === sessionId);
        if (sessions.length === 1) {
            return sessions[0];
        }
        return null;
    }
    getDisplaySessions() : types.IDisplaySession[] {
        if (this._displaySessions.length == 0) {
            this.ensureData();
        }
        return this._displaySessions;
    }

    private ensureData() {
        this.convertLocations();
        this.convertTracks();
        this.convertSpeakers();
        this.convertSessions();  
    }

    public updateFavorites(favoriteIds: number[]) {
        for (const session of this.getDisplaySessions()) {
            session.isFavorite = favoriteIds.indexOf(session.id) >= 0;
        }
    }

    private convertLocations() {
        for (const location of this.data.locations) {
            const display : types.IDisplayLocation = {
                id : location.id,
                name: location.name
            };
            this._displayLocations[location.id] = display; 
        }
    }
    
    private convertTracks() {
        for (const track of this.data.tracks) {
            const display : types.IDisplayTrack = {
                id : track.id,
                color: track.color,
                title: track.title,
                shortTitle: track.shortTitle
            };
            this._displayTracks[track.id] = display; 
        }
    }
    private convertSpeakers() {
        for (const speaker of this.data.speakers) {
            const display : types.IDisplaySpeaker = {
                id : speaker.id,
                name: speaker.name,
                imageUrl: speaker.imageUrl,
                bio: speaker.bio,
                sessions:[]
            };
            this._displaySpeakers[speaker.id] = display; 
        }        
    }   
    
    private convertSessions() {
        this._displaySessions = this.data.sessions.map(s=>this.convertToDisplaySession(s));
    }

    private convertToDisplaySession(session: types.ISession) : types.IDisplaySession {
        let displaySession : types.IDisplaySession=  {
            id: session.id,
            title: session.title,
            abstract: session.abstract,
            beginLocal: new Date(session.begin),
            endLocal: new Date(session.end),
            location: this._displayLocations[session.locationId],
            track: this._displayTracks[session.trackId],
            isFavorite: false,
            groupName: '',
            speakers: []
        };

        const speakerIds = this.data.sessionSpeakerMaps.filter(s=>s.sessionId === displaySession.id).map(s=>s.speakerId);
        for (const speakerId of speakerIds) {
            const speaker = this._displaySpeakers[speakerId];
            if (speaker) {
                speaker.sessions.push(displaySession);
                displaySession.speakers.push(speaker);
            }            
        }
        displaySession.fullTime =  this.getTime(displaySession)            

        displaySession.groupName = this.formatDate(displaySession.beginLocal) + ' - ' + this.formatDate(displaySession.endLocal);
        
        return displaySession;
    }
    getTime(session : types.IDisplaySession) : string {
        const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        const day = days[session.beginLocal.getDay()];
        return day + " " + session.groupName;
    }
    private formatDate(date: Date) {
        return moment(date).format("HH:mm");
    }
}