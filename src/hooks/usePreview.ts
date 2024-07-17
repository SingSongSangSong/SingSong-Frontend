import {useEffect, useState} from 'react';
import {previewSongs} from '../types';
import jsonData from '../assets/data/tagPreviewlist.json';

const usePreview = () => {
  const [previewSongs, setPreviewSongs] = useState<previewSongs>(jsonData);

  useEffect(() => {
    // 태그당 3개의 노래만 선택하여 previewSongs에 저장
    const newPreviewSongs: previewSongs = {};

    Object.keys(jsonData).forEach(tag => {
      newPreviewSongs[tag] = {
        songs: previewSongs[tag].songs.slice(0, 3), // 태그당 3개의 노래 선택
      };
    });

    setPreviewSongs(newPreviewSongs);
  }, []);

  return {
    previewSongs,
  };
};

export default usePreview;
