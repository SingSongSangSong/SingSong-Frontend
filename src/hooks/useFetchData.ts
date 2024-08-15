import getTags from '../api/tags/getTags';
import useSongStore from '../store/useSongStore';
import postRcdHome from '../api/recommendation/postRcdHome';
import {RcdHomeResponse, RcdHomeSongWithTags} from '../types';
import getRcdHomeSongs from '../api/recommendation/getRcdHomeSongs';

const useFetchData = () => {
  const {
    tags,
    setTags,
    previewSongs,
    setPreviewSongs,
    exploreSongs,
    setExploreSongs,
  } = useSongStore();

  const fetchTags = () => {
    return getTags()
      .then(tagData => {
        setTags(tagData.data);
        return tagData.data;
      })
      .then(fetchedTags => {
        // fetchRecommendTags를 태그 데이터를 설정한 후 호출
        return fetchRecommendTags(fetchedTags);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  };

  const fetchRcdHomeSongs = () => {
    return getRcdHomeSongs()
      .then(exploreSongData => {
        setExploreSongs(exploreSongData.data);
      })
      .catch(error => {
        console.error('Error fetching rcd home songs:', error);
      });
  };

  const fetchRecommendTags = (fetchedTags: string[]) => {
    return postRcdHome({tags: fetchedTags})
      .then((songData: RcdHomeResponse) => {
        songData.data.forEach((songWithTags: RcdHomeSongWithTags) => {
          setPreviewSongs(songWithTags.tag, songWithTags.songs);
        });
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  };

  const fetchData = () => {
    return fetchTags()
      .then(() => {
        // fetchRcdHomeSongs를 호출하고 싶다면 여기서 처리합니다.
        // return fetchRcdHomeSongs();
      })
      .catch(error => {
        console.error('Error in fetchData:', error);
      });
  };

  return {
    tags,
    previewSongs,
    exploreSongs,
    fetchData,
  };
};

export default useFetchData;
