import TokenStore from '../../store/TokenStore';
import {GetDetailSearchSongResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSearchArtistName = async (
  searchKeyword: string,
  page: number,
  size: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetDetailSearchSongResponse>(
      'v2/search/artist-name',
      {
        params: {keyword: searchKeyword, page: page, size: size},
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('search artist name response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getSearch:', error);
    throw error;
  }
};

export default getSearchArtistName;
