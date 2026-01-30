import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white border rounded-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome 👋</h1>
      <p className="text-gray-600">
        This is a multi-page CRUD application built with React, Zustand, React Router
        and Tailwind CSS.
      </p>

      <div className="flex gap-3">
        <Link
          to="/posts"
          className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
        >
          Go to Posts
        </Link>
        <Link
          to="/trash"
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Go to Trash
        </Link>
      </div>
    </div>
  );
}
