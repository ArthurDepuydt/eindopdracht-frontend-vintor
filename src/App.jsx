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
import EditPost from "./pages/editPost/EditPost";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  const { isAuth } = useContext(AuthContext);

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
          <Route
            path="/mijn-posts"
            element={isAuth ? <MyPosts /> : <Login />}
          />
          <Route
            path="/nieuwe-post"
            element={isAuth ? <NewPost /> : <Login />}
          />
          <Route
            path="/post-aanpassen/:id"
            element={isAuth ? <EditPost /> : <Login />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
