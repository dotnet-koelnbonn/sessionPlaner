import { IDisplaySpeaker } from "@/maintypes";

export interface ISpeakerGroup {
    name: string;
    speakers: IDisplaySpeaker[];
}

export interface ISpeakersState {
    groups: ISpeakerGroup[];
    speaker: IDisplaySpeaker;
}

