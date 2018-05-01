import * as types from "../maintypes";
import * as moment from "moment";
import { speakers } from "@/speakers";

async function loadData(url: string): Promise<types.IApiResult> {
  console.log("loadData", url);
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

export class ApiResultConverter {
  constructor(private $_rootState: types.IAppState) {}

  private $_data: types.IApiResult;
  private $_displaySessions: types.IDisplaySession[] = [];
  private $_displaySpeakers: { [id: number]: types.IDisplaySpeaker } = {};
  private $_displayLocations: { [id: number]: types.IDisplayLocation } = {};
  private $_displayTracks: { [id: number]: types.IDisplayTrack } = {};

  async findDisplaySession(sessionId: number): Promise<types.IDisplaySession> {
    const sessions = (await this.getDisplaySessions()).filter(
      s => s.id === sessionId
    );
    if (sessions.length === 1) {
      return sessions[0];
    }
    return null;
  }
  async findDisplaySpeaker(speakerId: number): Promise<types.IDisplaySpeaker> {
    await this.ensureData();
    return this.$_displaySpeakers[speakerId];
  }

  async getDisplaySessions(): Promise<types.IDisplaySession[]> {
    await this.ensureData();
    return this.$_displaySessions;
  }
  async getDisplaySpeakers(): Promise<types.IDisplaySpeaker[]> {
    await this.ensureData();
    let speakers : types.IDisplaySpeaker[] = [];
    for (let id in this.$_displaySpeakers) {
        speakers.push(this.$_displaySpeakers[id])        
    }
    return speakers;
  }

  public async updateFavorites(favoriteIds: number[]) {
    for (const session of await this.getDisplaySessions()) {
      session.isFavorite = favoriteIds.indexOf(session.id) >= 0;
    }
  }

  private async ensureData() {
    if (this.$_data) {
        return;
    }
    this.$_data = await loadData(this.$_rootState.apiUrl);
    this.convertLocations();
    this.convertTracks();
    this.convertSpeakers();
    this.$_displaySessions = this.convertSessions();
    const ids = localStorage.getItem('dncFavorites');
    if (ids) {
        this.$_rootState.favoriteIds = ids.split(',').map(id=>Number(id))
        await this.updateFavorites(this.$_rootState.favoriteIds);
    }
  }


  private convertLocations() {
    for (const location of this.$_data.locations) {
      const display: types.IDisplayLocation = {
        id: location.id,
        name: location.name
      };
      this.$_displayLocations[location.id] = display;
    }
  }

  private convertTracks() {
    for (const track of this.$_data.tracks) {
      const display: types.IDisplayTrack = {
        id: track.id,
        color: track.color,
        title: track.title,
        shortTitle: track.shortTitle
      };
      this.$_displayTracks[track.id] = display;
    }
  }
  private convertSpeakers() {
    for (const speaker of this.$_data.speakers) {
      const display: types.IDisplaySpeaker = {
        id: speaker.id,
        name: speaker.name,
        imageUrl: speaker.imageUrl,
        bio: speaker.bio,
        sessions: [],
        groupName: speaker.name[0]
      };
      this.$_displaySpeakers[speaker.id] = display;
    }
  }

  private convertSessions() {
    return this.$_data.sessions.map(s => this.convertToDisplaySession(s));
  }

  private convertToDisplaySession(
    session: types.ISession
  ): types.IDisplaySession {
    let displaySession: types.IDisplaySession = {
      id: session.id,
      title: session.title,
      abstract: session.abstract,
      beginLocal: new Date(session.begin),
      endLocal: new Date(session.end),
      location: this.$_displayLocations[session.locationId],
      track: this.$_displayTracks[session.trackId],
      isFavorite: false,
      groupName: "",
      speakers: []
    };

    const speakerIds = this.$_data.sessionSpeakerMaps
      .filter(s => s.sessionId === displaySession.id)
      .map(s => s.speakerId);

    for (const speakerId of speakerIds) {
      const speaker = this.$_displaySpeakers[speakerId];
      if (speaker) {
        speaker.sessions.push(displaySession);
        displaySession.speakers.push(speaker);
      }
    }

    displaySession.groupName =
      this.formatDate(displaySession.beginLocal) +
      " - " +
      this.formatDate(displaySession.endLocal);

      displaySession.fullTime = this.getTime(displaySession);

    return displaySession;
  }
  getTime(session: types.IDisplaySession): string {
    const days = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freotag",
      "Samstag"
    ];
    const day = days[session.beginLocal.getDay()];
    return day + " " + session.groupName;
  }
  private formatDate(date: Date) {
    return moment(date).format("HH:mm");
  }
}
