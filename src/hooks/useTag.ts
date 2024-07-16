import {useEffect, useState} from 'react';
import useRecommendStore from '../store/useRecommendStore';
import {TagsResponse} from '../types';
import getTags from '../api/getTags';

const useTag = () => {
  const {
    selectedSong,
    selectedSongTag,
    setSelectedSongTag,
    selectedAdditionTag,
    setSelectedAdditionTag,
  } = useRecommendStore();

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchgetTagData();
  }, []);

  const fetchgetTagData = async () => {
    try {
      const tagData: TagsResponse = await getTags();
      setTags(tagData.tags);
      console.log(tagData.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagRemove = (
    index: number,
    tagLst: string[],
    setTag: (updatedTag: string[]) => void,
  ) => {
    if (tagLst) {
      const updatedTags = tagLst.filter((_, i) => i !== index);
      setTag(updatedTags);
    }
  };

  const handleTagAdd = (tag: string) => {
    const updatedTags = [...selectedAdditionTag, tag];
    setSelectedAdditionTag(updatedTags);
  };

  return {
    tags,
    selectedSong,
    selectedSongTag,
    selectedAdditionTag,
    handleTagRemove,
    handleTagAdd,
    setSelectedSongTag,
    setSelectedAdditionTag,
  };
};

export default useTag;
