import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {SearchKeepList} from '../..';
import useKeepListStore from '../../../store/useKeepStore';
import getKeep from '../../../api/keep/getKeep';

// interface SearchKeepProps {
//   onPressRecent: (searchText: string) => void;
// }

const SearchKeep = () => {
  const keepList = useKeepListStore(state => state.keepList);
  const setKeepList = useKeepListStore(state => state.setKeepList);
  const [isKeepLoading, setIsKeepLoading] = useState<boolean>(false);
  useEffect(() => {
    if (keepList.length === 0) {
      setInitKeep();
    } else {
      setIsKeepLoading(true);
    }
    // if (tempKeepList) {
    //   setKeepList(tempKeepList);
    //   setIsKeepLoading(false);
    // }
  }, []);

  const setInitKeep = async () => {
    const tempKeepList = await getKeep();
    setKeepList(tempKeepList.data);
    setIsKeepLoading(true);
  };

  return (
    <View style={tw`flex-1 w-full justify-center items-center`}>
      {isKeepLoading ? <SearchKeepList songData={keepList} /> : <View />}
    </View>
  );
};

export {SearchKeep};
