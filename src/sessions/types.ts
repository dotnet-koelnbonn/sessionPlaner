
import { IDisplaySession } from '../maintypes';

export interface ISessionGroup {
    name: string;
    sessions: IDisplaySession[];
}

export interface ISessionState {
    groups: ISessionGroup[]; 
    session?: IDisplaySession; 
}

