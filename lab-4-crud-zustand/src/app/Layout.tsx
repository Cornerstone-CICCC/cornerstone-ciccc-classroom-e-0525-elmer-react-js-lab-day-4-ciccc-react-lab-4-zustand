import { NavLink, Outlet } from "react-router-dom";

const base =
  "px-3 py-2 rounded-lg text-sm font-medium transition";
const active = "bg-black text-white";
const idle = "text-gray-700 hover:bg-gray-100";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <h1 className="font-semibold">Lab Day 4 · CRUD (Zustand)</h1>

          <nav className="flex gap-2">
            <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
              Home
            </NavLink>
            <NavLink to="/posts" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
              Posts
            </NavLink>
            <NavLink to="/trash" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
              Trash
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
