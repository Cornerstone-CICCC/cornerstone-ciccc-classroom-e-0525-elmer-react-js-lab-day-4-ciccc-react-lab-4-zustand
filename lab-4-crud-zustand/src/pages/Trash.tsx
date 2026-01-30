import { useMemo } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../stores/post.store";

export default function Trash() {
  const navigate = useNavigate();

  const allPosts = usePostStore((s) => s.posts);
  const recoverPost = usePostStore((s) => s.recoverPost);
  const deletePermanently = usePostStore((s) => s.deletePermanently);

  const trashed = useMemo(() => allPosts.filter((p) => p.isDeleted), [allPosts]);

  const onRecover = (id: string) => {
    recoverPost(id);
    toast.success("Post recovered");
  };

  const onDeleteForever = (id: string) => {
    deletePermanently(id);
    toast.success("Post deleted permanently");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Trash</h1>
          <p className="text-gray-600 text-sm">Only deleted posts appear here.</p>
        </div>

        <Link to="/posts" className="underline text-sm">
          Back to Posts
        </Link>
      </div>

      {trashed.length === 0 ? (
        <div className="bg-white border rounded-2xl p-6 text-gray-600">
          Trash is empty.
        </div>
      ) : (
        <div className="grid gap-3">
          {trashed.map((p) => (
            <div key={p.id} className="bg-white border rounded-2xl p-4">
              <button
                onClick={() => navigate(`/posts/${p.id}`)}
                className="text-left w-full"
              >
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {p.content}
                </div>
                <div className="mt-2 text-xs text-gray-400">ID: {p.id}</div>
              </button>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onRecover(p.id)}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  Recover
                </button>

                <button
                  onClick={() => onDeleteForever(p.id)}
                  className="px-3 py-2 rounded-lg bg-red-600 text-white hover:opacity-90 text-sm"
                >
                  Delete permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
