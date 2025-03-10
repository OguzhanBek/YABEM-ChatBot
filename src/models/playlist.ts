export interface PlaylistProp {
  displayName: string;
  id: number;
  userDiscordId: string;
  youtubeURL: string;
  image: string;
}

export interface DiscordPlayList {
  creator: string;
  date: string;
  id: number;
  desc: string
  image: string;
  title: string;
  visible: "public" | "private"
  list: PlaylistProp[];
}
