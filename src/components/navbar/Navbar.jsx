import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Add from "../../assets/add.svg";
import Account from "../../assets/account.svg";
import { useState } from "react";
import Input from "../input/Input";

import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");

  function clickAccount() {
    const overlay = document.querySelector(".nav-account__overlay");
    overlay.classList.toggle("active");
  }

  return (
    <>
      <nav>
        <div className="container nav-container">
          <img src={Logo} alt="Vintor logo" className="logo" />
          <Input
            type="text"
            id="search"
            name="search"
            value={search}
            setValue={setSearch}
            style="light search"
            placeholder="Post of tag zoeken"
          />
          <div className="nav-icons">
            <img src={Add} alt="Add item" className="nav-add" />
            <div className="nav-account__overlay-container">
              <img
                src={Account}
                alt="Account"
                className="nav-account"
                onClick={clickAccount}
              />
              <div className="nav-account__overlay">
                <Link to="mijn-posts" className="nav-account__overlay-item">
                  Mijn posts
                </Link>
                <Link to="uitloggen" className="nav-account__overlay-item">
                  Uitloggen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
