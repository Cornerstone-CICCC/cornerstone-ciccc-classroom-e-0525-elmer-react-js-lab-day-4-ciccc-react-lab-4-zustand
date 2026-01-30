import { useEffect, useState } from "react";
import type { FormEvent } from "react";import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostStore } from "../stores/post.store";

export default function PostNew() {
  const navigate = useNavigate();
  const createPost = usePostStore((s) => s.createPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const id = createPost({ title: title.trim(), content: content.trim() });
    toast.success("Post created!");
    navigate(`/posts/${id}`);
  };

  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Add Post</h1>
          <p className="text-gray-600 text-sm">Create a new post.</p>
        </div>
        <Link className="underline text-sm" to="/posts">
          Back
        </Link>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full min-h-[140px] rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
          />
        </div>

        <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
          Create
        </button>
      </form>
    </div>
  );
}
