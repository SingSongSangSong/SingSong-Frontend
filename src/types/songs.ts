interface KeepSong {
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
}

interface RcdHomeSong {
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
}

interface RcdExploreSong {
  album: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
}

interface RcdRefreshSong {
  isKeep: boolean;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
}

interface RcdSong {
  singerName: string;
  songName: string;
  songNumber: number;
  tags: string[];
}

interface KeepResponse {
  data: KeepSong[];
  message: string;
}

interface RcdHomeSongWithTags {
  songs: RcdHomeSong[];
  tag: string;
}

interface RcdHomeResponse {
  data: RcdHomeSongWithTags[];
  message: string;
}

interface RcdExploreResponse {
  data: RcdExploreSong[];
  message: string;
}

interface RcdRefreshResponse {
  data: RcdRefreshSong[];
  message: string;
}

interface RcdSongResponse {
  data: RcdSong[];
  message: string;
}

interface TagsResponse {
  data: string[];
  message: string;
}

interface TagProps {
  tags: string[];
}

interface SongNumbersProps {
  songNumbers: number[];
}

interface DeleteKeepResponse {
  data: SongNumbersProps;
  message: string;
}

export type {
  KeepSong,
  RcdHomeSong,
  RcdRefreshSong,
  RcdSong,
  RcdExploreSong,
  RcdHomeSongWithTags,
  RcdHomeResponse,
  RcdRefreshResponse,
  RcdSongResponse,
  RcdExploreResponse,
  KeepResponse,
  TagsResponse,
  TagProps,
  SongNumbersProps,
  DeleteKeepResponse,
};
