import {create} from 'zustand';
import {Post} from '../types';

interface PostState {
  post: Post[]; //나중에 keep에 저장되어 있는지 true/false로 바꾸기
  setPost: (post: Post[]) => void;
  deletePost: (postId: number) => void;
}

const usePostStore = create<PostState>((set, get) => {
  const initState = {
    post: [],
  };

  return {
    ...initState,

    setPost: (post: Post[]) => {
      set(() => ({
        post: post,
      }));
    },

    deletePost: (postId: number) => {
      const post = get().post.filter(pos => pos.postId !== postId);
      set({post});
    },
  };
});

export default usePostStore;
