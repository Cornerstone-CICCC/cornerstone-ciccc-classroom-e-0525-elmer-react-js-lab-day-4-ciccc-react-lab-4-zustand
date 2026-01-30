// src/stores/post.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type Post = {
  id: string;
  title: string;
  content: string;
  isDeleted: boolean;
};

type PostStore = {
  posts: Post[];

  createPost: (data: { title: string; content: string }) => string;
  updatePost: (id: string, data: { title: string; content: string }) => void;

  softDeletePost: (id: string) => void;
  recoverPost: (id: string) => void;
  deletePermanently: (id: string) => void;

  getPostById: (id: string) => Post | undefined;
};

const initialPosts: Post[] = [
  {
    id: uuid(),
    title: "Welcome post",
    content: "This is your first post created using Zustand.",
    isDeleted: false,
  },
];

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: initialPosts,

      createPost: ({ title, content }) => {
        const id = uuid();
        const newPost: Post = {
          id,
          title,
          content,
          isDeleted: false,
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));

        return id;
      },

      updatePost: (id, { title, content }) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, title, content } : post
          ),
        }));
      },

      softDeletePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, isDeleted: true } : post
          ),
        }));
      },

      recoverPost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, isDeleted: false } : post
          ),
        }));
      },

      deletePermanently: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },

      getPostById: (id) => {
        return get().posts.find((post) => post.id === id);
      },
    }),
    {
      name: "posts-storage", // key en localStorage
    }
  )
);
