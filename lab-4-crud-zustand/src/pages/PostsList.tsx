import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../stores/post.store";

export default function PostsList() {
  const navigate = useNavigate();

  // 1) Trae el array "crudo"
  const allPosts = usePostStore((s) => s.posts);

  // 2) Filtra con useMemo (evita array nuevo en cada render)
  const posts = useMemo(
    () => allPosts.filter((p) => !p.isDeleted),
    [allPosts]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-gray-600 text-sm">
            Only non-deleted posts appear here.
          </p>
        </div>

        <Link
          to="/posts/new"
          className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
        >
          + Create
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border rounded-2xl p-6 text-gray-600">
          No posts yet. Click <span className="font-medium">Create</span> to add one.
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/posts/${p.id}`)}
              className="text-left bg-white border rounded-2xl p-4 hover:shadow-sm transition"
            >
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                {p.content}
              </div>
              <div className="mt-2 text-xs text-gray-400">ID: {p.id}</div>
            </button>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-600">
        Want deleted posts? Go to{" "}
        <Link className="underline" to="/trash">
          Trash
        </Link>
        .
      </div>
    </div>
  );
}
