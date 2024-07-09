export interface Song {
  song_number: number;
  song_name: string;
  singer_name: string;
  preview_url: string | null;
  tags: string[];
}

export interface SongsResponse {
  songs: Song[];
}

export interface Props {
  energy: number;
  electronic: number;
  brightness: number;
  speed: number;
  danceability: number;
}

export interface TagsResponse {
  tags: string[];
}

export interface TagProps {
  tag: string;
}
export interface SongWithTagsProps {
  songNumber: number;
  tags: string[];
}
