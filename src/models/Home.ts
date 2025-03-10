import { DiscordPlayList, PlaylistProp } from "./playlist";

export interface HomeResponse {
  data: HomeData[];
  status: number;
  message: string;
  type: string;
}

export interface HomeData {
  desc: "Herkesin dinlediği playlistler";
  title: "Playlistler";
  type: "playlist" | "song" | "last-played" | "community-playlist";
  data: DiscordPlayList[] | PlaylistProp[] | HistorySongData[];
}

export interface HistorySongData {
  author: string;
  createdAt: number;
  duration: string;
  id: number;
  thumbnail: string;
  title: string;
  updatedAt: number;
  url: string;
  userDiscordId: string;
  views: number;
}
