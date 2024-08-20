interface KeepSong {
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
}

interface RcdHomeSong {
  album: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
}

interface Song {
  album: string;
  isKeep?: boolean;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags?: string[];
  isMr: true;
}

interface GetSearchSong {
  artistName: Song[];
  songName: Song[];
  songNumber: Song[];
}

interface GetSearchSongResponse {
  data: GetSearchSong;
  message: string;
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
  data: Song[];
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
  data: Song[];
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

interface SongInfo {
  album: string;
  description: string;
  isKeep: boolean;
  octave: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
  keepCount: number;
  commentCount: number;
}

interface SongInfoResponse {
  data: SongInfo;
  message: string;
}

interface SongInfoRelated {
  nextPage: number;
  songs: Song[];
}

interface SongInfoRelatedResponse {
  data: SongInfoRelated;
  message: string;
}

interface SongInfoReview {
  count: number;
  selected: boolean;
  songReviewOptionId: number;
  title: string;
}

interface SongInfoReviewResponse {
  data: SongInfoReview[];
  message: string;
}

interface Chart {
  artistName: string;
  isMr: number;
  new: string;
  ranking: number;
  rankingChange: number;
  songId: number;
  songName: string;
  songNumber: number;
  totalScore: number;
}
interface ChartResponse {
  data: {gender: string; female: Chart[]; male: Chart[]; time: string};
}

interface SongParams {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
}

interface GetSongReviewOptionsResponse {
  data: string[];
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
  SongInfo,
  SongInfoResponse,
  SongInfoRelated,
  SongInfoRelatedResponse,
  SongInfoReview,
  SongInfoReviewResponse,
  Song,
  Chart,
  ChartResponse,
  SongParams,
  GetSearchSong,
  GetSearchSongResponse,
  GetSongReviewOptionsResponse,
};
