interface KeepSong {
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
}
interface TermItem {
  label: string;
  value: string;
  url: string;
}

interface RcdHomeSong {
  album: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags: string[];
  isMr: boolean;
  melonLink?: string;
}

interface Song {
  album: string;
  isKeep?: boolean;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tags?: string[];
  isMr: boolean;
  isLive?: boolean;
  keepCount?: number;
  commentCount?: number;
  melonLink?: string;
  tjYoutubeLink?: string;
  lyricsYoutubeLink?: string;
  lyricsVideoId?: string;
  tjVideoId?: string;
}

interface LlmSongResponse {
  data: {songs: Song[]};
  message: string;
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

interface DetailSearchSong {
  nextPage: number;
  songs: Song[];
}

interface GetDetailSearchSongResponse {
  data: DetailSearchSong;
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

interface RcdRefreshV2Response {
  data: {nextPage: number; songs: Song[]};
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
  melonLink?: string;
  tjYoutubeLink?: string;
  lyricsYoutubeLink?: string;
  lyricsVideoId?: string;
  tjVideoId?: string;
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

interface ChartSong {
  album: string;
  artistName: string;
  isLive: boolean;
  isMr: boolean;
  isNew: boolean;
  ranking: number;
  rankingChange: number;
  songId: number;
  songName: string;
  songNumber: number;
  totalScore: number;
  melonLink: string;
  lyricsVideoId?: string;
}

// interface ChartV2 {
//   ageGroup: string;
//   charts: {
//     chartKey: string;
//     songs: ChartSong[];
//   }[];
//   gender: string;
//   time: string;
//   userKey: string;
// }

interface ChartV2 {
  chartKey: string;
  songs: ChartSong[];
}

interface ChartV2Response {
  data: {
    time: string;
    gender: string;
    ageGroup: string;
    userKey: string;
    charts: ChartV2[];
  };
  message: string;
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

interface GetRcdRecommendationResponse {
  data: {songs: Song[]};
  message: string;
}

interface NewSong {
  album: string;
  commentCount: number;
  isKeep: boolean;
  isLive: boolean;
  isMr: boolean;
  isRecentlyUpdated: boolean;
  keepCount: number;
  melonLink: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tjYoutubeLink?: string;
  lyricsYoutubeLink?: string;
  lyricsVideoId?: string;
}

interface GetSongsNewResponse {
  data: {
    lastCursor: number;
    songs: NewSong[];
  };
  message: string;
}

interface GetKeepResponse {
  data: {
    lastCursor: number;
    songs: KeepSongV2[];
  };
  message: string;
}

interface KeepSongV2 {
  album: string;
  isLive: boolean;
  isMr: boolean;
  keepSongId: number;
  melonLink: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
  tjYoutubeLink: string;
  lyricsYoutubeLink: string;
  lyricsVideoId?: string;
}

interface GetRecentCommentResponse {
  data: Song[];
  message: string;
}

interface GetRecentKeepResponse {
  data: Song[];
  message: string;
}

interface GetRecentSearchResponse {
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
  GetDetailSearchSongResponse,
  DetailSearchSong,
  GetRcdRecommendationResponse,
  ChartV2,
  ChartV2Response,
  ChartSong,
  TermItem,
  LlmSongResponse,
  NewSong,
  GetSongsNewResponse,
  RcdRefreshV2Response,
  KeepSongV2,
  GetKeepResponse,
  GetRecentCommentResponse,
  GetRecentKeepResponse,
  GetRecentSearchResponse,
};
