import {useEffect, useState} from 'react';
import {TagsResponse} from '../types';
import getTags from '../api/getTags';

const useCategory = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (!init) {
      fetchGetCategory();
      setInit(true);
    }
  }, [init]);

  const fetchGetCategory = async () => {
    try {
      const tagData: TagsResponse = await getTags();
      setCategory(tagData.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  return {
    category,
  };
};

export default useCategory;
