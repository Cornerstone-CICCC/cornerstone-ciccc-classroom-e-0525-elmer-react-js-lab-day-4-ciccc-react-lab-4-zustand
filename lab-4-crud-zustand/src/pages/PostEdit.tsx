import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostStore } from "../stores/post.store";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = usePostStore((s) => (id ? s.getPostById(id) : undefined));
  const updatePost = usePostStore((s) => s.updatePost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!id || !post) {
    return (
      <div className="bg-white border rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-2">Post not found</h1>
        <Link className="underline" to="/posts">
          Back to Posts
        </Link>
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    updatePost(id, { title: title.trim(), content: content.trim() });
    toast.success("Post updated!");
    navigate(`/posts/${id}`);
  };

  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Edit Post</h1>
          <p className="text-gray-600 text-sm">Update title and content.</p>
        </div>
        <Link className="underline text-sm" to={`/posts/${id}`}>
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full min-h-[140px] rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}
