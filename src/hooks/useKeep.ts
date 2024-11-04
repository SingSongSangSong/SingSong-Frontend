import {useEffect, useState} from 'react';
// import {KeepSongV2} from '../types';
import getKeepV2 from '../api/keep/getKeepV2';
import {logRefresh} from '../utils';
import {useQuery} from '@tanstack/react-query';
import useKeepV2Store from '../store/useKeepV2Store';

const useKeep = () => {
  // const [isKeepLoading, setIsKeepLoading] = useState(false);
  // const [selectedFilter, setSelectedFilter] = useState<string>('recent');
  // const [keepList, setKeepList] = useState<KeepSongV2[]>();
  // const [lastCursor, setLastCursor] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isEnded, setIsEnded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLengthZero, setIsLengthZero] = useState<boolean>(false);
  const size = 20;

  const isInitialized = useKeepV2Store(state => state.isInitialized);
  const setIsInitialized = useKeepV2Store(state => state.setIsInitialized);
  const keepList = useKeepV2Store(state => state.keepList);
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const addKeepList = useKeepV2Store(state => state.addKeepList);
  const lastCursor = useKeepV2Store(state => state.lastCursor);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);
  const setSelectedFilter = useKeepV2Store(state => state.setSelectedFilter);
  const isEnded = useKeepV2Store(state => state.isEnded);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const filters = ['recent', 'old'];

  const {
    data: tempKeep,
    error: keepError,
    isFetching: isFetchingKeep,
  } = useQuery({
    queryKey: ['keeps'],
    queryFn: () => getKeepV2(selectedFilter, -1, size),

    staleTime: 0, // 1시간 동안 캐시 유지
    select: data => data.data,
    enabled: !isInitialized,
  });

  useEffect(() => {
    if (tempKeep) {
      setIsInitialized(true);
      if (tempKeep.songs.length == 0) {
        // console.log('length is zero');
        setIsLengthZero(true);
      }
      setKeepList(tempKeep.songs);
      if (tempKeep.songs.length != 0) {
        setLastCursor(tempKeep.lastCursor);
      }
    }
  }, [tempKeep]);

  useEffect(() => {
    if (keepList && !isFetchingKeep) {
      if (keepList.length == 0) {
        setIsLengthZero(true);
      }
    }
  }, [keepList]);

  // const setInitKeep = useCallback(async () => {
  //   setIsKeepLoading(true);
  //   const tempData = await getKeepV2(filter, lastCursor, size);
  //   setKeepList(tempData.data.songs);
  //   setLastCursor(tempData.data.lastCursor);
  //   setIsKeepLoading(false);
  // }, []); // 필요한 상태 및 함수들을 의존성 배열에 추가

  // useFocusEffect(
  //   useCallback(() => {
  //     // setInitKeep(); //keep을 항상 불러오기
  //     refetchKeep();
  //   }, []),
  // ); //focusEffect시마다 refetch되게하면 안될 것 같음

  const handleOnRefreshKeep = async () => {
    try {
      if (keepList) {
        const keepData = await getKeepV2(selectedFilter, -1, size);
        setKeepList(keepData.data.songs);
        setLastCursor(keepData.data.lastCursor);
        setIsEnded(false);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleOnChangeKeep = async (filter: string) => {
    try {
      if (keepList) {
        const keepData = await getKeepV2(filter, -1, size);
        setKeepList(keepData.data.songs);
        setLastCursor(keepData.data.lastCursor);
        setIsEnded(false);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleDownRefreshKeep = async () => {
    if (isLoading || isEnded) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (keepList && keepList.length >= size) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('down_keep');
        getKeepV2(selectedFilter, lastCursor, size)
          .then(response => {
            const keepData = response.data.songs;
            if (keepData.length === 0) {
              setIsEnded(true);
              setIsLoading(false);
              return;
            }
            // setKeepList(prev => [...(prev || []), ...keepData]);
            addKeepList(keepData);
            setLastCursor(response.data.lastCursor);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error post refreshing:', error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    // setRefreshing(true);

    setRefreshing(true);
    await handleOnRefreshKeep();
    logRefresh('up_keep');
    setRefreshing(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // 새로고침 지연 시간
  };

  const handleOnPressFilter = () => {
    // console.log('성별 변경');
    setIsModalVisible(true);
  };

  const handleOnPressChangeFilter = async (filter: string) => {
    setSelectedFilter(filter);
    // await handleOnRefreshKeep();
    await handleOnChangeKeep(filter);
  };

  return {
    keepList,
    handleDownRefreshKeep,
    onRefresh,
    isLoading,
    refreshing,
    keepError,
    isFetchingKeep,
    isLengthZero,
    selectedFilter,
    handleOnPressFilter,
    filters,
    isModalVisible,
    setIsModalVisible,
    handleOnPressChangeFilter,
  };
};

export default useKeep;
