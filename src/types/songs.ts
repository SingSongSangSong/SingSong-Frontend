export interface Song {
  song_name: string;
  singer_name: string;
  preview_url: string | null;
  duration_ms: number | null;
  album_name: string;
  similarity: number | null;
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
