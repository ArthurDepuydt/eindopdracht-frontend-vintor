import Navbar from "./components/navbar/Navbar";
import "./reset.css";
import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Searchpage from "./pages/searchpage/Searchpage";
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
        </Routes>
      </main>
    </>
  );
}

export default App;
