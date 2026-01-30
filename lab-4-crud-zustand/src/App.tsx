import { Routes, Route } from "react-router-dom";
import Layout from "./app/Layout";
import Home from "./pages/Home";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import PostNew from "./pages/PostNew";
import PostEdit from "./pages/PostEdit";
import Trash from "./pages/Trash";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
