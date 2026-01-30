import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostStore } from "../stores/post.store";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = usePostStore((s) => (id ? s.getPostById(id) : undefined));
  const softDeletePost = usePostStore((s) => s.softDeletePost);

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

  const onDelete = () => {
    softDeletePost(post.id);
    toast.success("Post moved to Trash");
    navigate("/trash");
  };

  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p className="text-gray-500 text-sm mt-1">ID: {post.id}</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/posts/${post.id}/edit`}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Edit
          </Link>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

      <div className="mt-6">
        <Link className="underline text-sm" to="/posts">
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
}
