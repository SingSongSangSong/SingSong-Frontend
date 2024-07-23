interface Song {
  songNumber: number;
  songName: string;
  singerName: string;
  tags: string[];
}

interface SongsResponse {
  songs: Song[];
}

interface previewSongs {
  [tag: string]: SongsResponse;
}

// interface TagsResponse {
//   tags: string[];
// }

interface TagProps {
  tags: string[];
}

interface SongWithTagsProps {
  songs: Song[];
  tag: string;
}

interface RecommendTagsResponse {
  data: SongWithTagsProps[];
  message: string;
}

interface RecommendResponse {
  data: Song[];
  message: string;
}

interface TagsResponse {
  data: string[];
  message: string;
}

interface PlaylistInfo {
  playlistName: string;
  songCount: number;
}

export type {
  Song,
  SongsResponse,
  previewSongs,
  TagsResponse,
  RecommendTagsResponse,
  RecommendResponse,
  TagProps,
  SongWithTagsProps,
  PlaylistInfo,
};
