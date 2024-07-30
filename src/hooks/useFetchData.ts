import getTags from '../api/tags/getTags';
import useDataStore from '../store/useSongStore';
import postRcdHome from '../api/recommendation/postRcdHome';
import {RcdHomeResponse, RcdHomeSongWithTags} from '../types';

const useFetchData = () => {
  const {tags, setTags, previewSongs, setPreviewSongs} = useDataStore();

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
      const songData: RcdHomeResponse = await postRcdHome({
        tags: fetchedTags,
      });

      songData.data.forEach((songWithTags: RcdHomeSongWithTags) => {
        setPreviewSongs(songWithTags.tag, songWithTags.songs);
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
    previewSongs,
    fetchData,
  };
};

export default useFetchData;
