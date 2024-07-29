import {RecommendTagsResponse, SongWithTagsProps} from '../types';
import getTags from '../api/tags/getTags';
import useDataStore from '../store/useDataStore';
import postRecommendTags from '../api/recommendation/postRcdHome';

const useFetchData = () => {
  const {tags, setTags, tagWithSongs, setTagWithSongs} = useDataStore();

  const fetchTags = async () => {
    try {
      const tagData = await getTags();
      setTags(tagData.data);

      // fetchRecommendTags를 태그 데이터를 설정한 후 호출
      fetchRecommendTags(tagData.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchRecommendTags = async (fetchedTags: string[]) => {
    try {
      const songData: RecommendTagsResponse = await postRecommendTags({
        tags: fetchedTags,
      });

      songData.data.forEach((songWithTags: SongWithTagsProps) => {
        setTagWithSongs(songWithTags.tag, songWithTags.songs);
      });
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const fetchData = async () => {
    await fetchTags();
  };

  return {
    tags,
    tagWithSongs,
    fetchData,
  };
};

export default useFetchData;
