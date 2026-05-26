import Navbar from "./components/navbar/Navbar";
import "./reset.css";
import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Searchpage from "./pages/searchpage/Searchpage";
import Post from "./pages/post/Post";
import MyPosts from "./pages/myPosts/MyPosts";
import NewPost from "./pages/newPost/NewPost";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registreren" element={<Register />} />
          <Route path="/zoeken/:id" element={<Searchpage />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/mijn-posts" element={<MyPosts />} />
          <Route path="/nieuwe-post" element={<NewPost />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
