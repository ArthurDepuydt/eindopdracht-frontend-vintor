import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Add from "../../assets/add.svg";
import Account from "../../assets/account.svg";
import AccountDark from "../../assets/accountdark.svg";
import { useState } from "react";
import Input from "../input/Input";

import { useNavigate, useLocation } from "react-router-dom";

import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { logout } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname.startsWith("/zoeken/")) {
      console.log(location.pathname);
      const query = decodeURIComponent(
        location.pathname.replace("/zoeken/", ""),
      );
      setSearch(query);
    }
  }, [location]);

  function clickAccount() {
    const overlay = document.querySelector(".nav-account__overlay");
    overlay.classList.toggle("active");
  }

  useEffect(() => {
    const overlay = document.querySelector(".nav-account__overlay");
    overlay.classList.remove("active");
    setMobileMenuOpen(false);
  }, [location]);

  function handleSearch(e) {
    e.preventDefault();

    const searchParam = search.trim();

    navigate(`zoeken/${searchParam}`);
  }

  return (
    <>
      <nav>
        <div className="container nav-container">
          <Link to="/" className="nav-logo-link">
            <img src={Logo} alt="Vintor logo" className="logo" />
          </Link>
          <form onSubmit={handleSearch} className="nav-search">
            <Input
              type="text"
              id="search"
              name="search"
              value={search}
              setValue={setSearch}
              style="light search"
              placeholder="Post of tag zoeken"
            />
          </form>
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
                {isAuth ? (
                  <>
                    <Link
                      to="/mijn-posts"
                      className="nav-account__overlay-item"
                    >
                      Mijn posts
                    </Link>
                    <span
                      className="nav-account__overlay-item"
                      onClick={logout}
                    >
                      Uitloggen
                    </span>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="nav-account__overlay-item inloggen"
                  >
                    Inloggen
                  </Link>
                )}
              </div>
            </div>
            <button
              className="nav-mobile-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className={`nav-mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-mobile-menu__item">
            Home
          </Link>
          <Link to="/nieuwe-post" className="nav-mobile-menu__item">
            Nieuwe post
          </Link>
          {isAuth ? (
            <>
              <Link to="/mijn-posts" className="nav-mobile-menu__item">
                Mijn posts
              </Link>
              <span className="nav-mobile-menu__item" onClick={logout}>
                Uitloggen
              </span>
            </>
          ) : (
            <Link to="/login" className="nav-mobile-menu__item">
              Inloggen
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
