import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Add from "../../assets/add.svg";
import Account from "../../assets/account.svg";
import AccountDark from "../../assets/accountdark.svg";
import { useState } from "react";
import Input from "../input/Input";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Navbar() {
  const [search, setSearch] = useState("");

  const { logout } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  function clickAccount() {
    const overlay = document.querySelector(".nav-account__overlay");
    overlay.classList.toggle("active");
  }

  return (
    <>
      <nav>
        <div className="container nav-container">
          <Link to="/">
            <img src={Logo} alt="Vintor logo" className="logo" />
          </Link>
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
            <Link to="/nieuwe-post" className="nav-add-link">
              <img src={Add} alt="Add item" className="nav-add" />
            </Link>
            <div className="nav-account__overlay-container">
              {isAuth ? (
                <div className="nav-account-bg">
                  <img
                    src={AccountDark}
                    alt="Account"
                    className="nav-account"
                    onClick={clickAccount}
                  />
                </div>
              ) : (
                <img
                  src={Account}
                  alt="Account"
                  className="nav-account"
                  onClick={clickAccount}
                />
              )}

              <div className="nav-account__overlay">
                <Link to="/mijn-posts" className="nav-account__overlay-item">
                  Mijn posts
                </Link>
                <span className="nav-account__overlay-item" onClick={logout}>
                  Uitloggen
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
