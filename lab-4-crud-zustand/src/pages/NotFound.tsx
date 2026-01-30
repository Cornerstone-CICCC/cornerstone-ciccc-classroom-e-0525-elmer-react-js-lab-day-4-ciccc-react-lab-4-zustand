import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found.</p>
      <Link className="underline" to="/">
        Go Home
      </Link>
    </div>
  );
}
