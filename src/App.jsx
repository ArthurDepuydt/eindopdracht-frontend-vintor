import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Logo from "./assets/logo.svg";
import "./reset.css";
import "./App.css";

import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
      </main>
    </>
  );
}

export default App;
