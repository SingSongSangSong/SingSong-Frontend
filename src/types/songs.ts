interface Song {
  song_number: number;
  song_name: string;
  singer_name: string;
  tags: string[];
}

interface SongsResponse {
  songs: Song[];
}

interface previewSongs {
  [tag: string]: SongsResponse;
}

interface TagsResponse {
  tags: string[];
}

interface TagProps {
  tag: string;
}

interface SongWithTagsProps {
  songNumber: number;
  songTags: string[];
  additionTags: string[];
}

export type {
  Song,
  SongsResponse,
  previewSongs,
  TagsResponse,
  TagProps,
  SongWithTagsProps,
};
