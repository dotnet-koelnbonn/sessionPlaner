import { ApiResultConverter } from "@/services/dataService";

interface IClaim {

}

interface ILocation {
    id: number;
    name: string;
}
interface IMap {
    id: number;
    sessionId: number;
    speakerId: number;
}

export interface ISession {
    id: number;
    locationId: number;
    begin: string;
    end: string;
    beginLocal: Date;
    groupName: string;
    endLocal: Date;
    title: string;
    abstract: string;
    trackId: number;
    isFavorite: boolean;
}

interface ISpeaker{
    id: number;
    bio: string;
    imageUrl : string;
    name: string;
}

interface IFavorite{}

interface ITrack{
    id: number;
    color: string;
    shortTitle: string;
    title: string;
}


export interface IDisplaySpeaker {
    id : number;
    name : string;
    imageUrl : string;
    bio: string;
    sessions: IDisplaySession[];
    groupName: string;
}

export interface IDisplayLocation {
    id: number;
    name: string;
}
export interface IDisplayTrack {
    id: number;
    color: string;
    shortTitle: string;
    title: string;
}
export interface IDisplaySession {
    id?: number;
    title?: string;
    groupName?: string;
    endLocal?: Date;
    beginLocal?: Date;
    track? : IDisplayTrack;
    trackName?: string;
    trackColor?: string;
    location?: IDisplayLocation;
    isFavorite?: boolean;
    speakers?: IDisplaySpeaker[];
    fullTime?: string;
    abstract?: string;
}

export interface IAppState {
    apiUrl: string,
    favoriteIds: number[];
    service?: ApiResultConverter
}

export interface IApiResult {
    claims: IClaim[];
    locations: ILocation[];
    sessionSpeakerMaps:IMap[];
    sessions: ISession[];
    speakers: ISpeaker[];
    tracks: ITrack[];
    title: string;    
}