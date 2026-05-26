import { useState } from "react";
import "./SidebarButton.css";

import Chevron from "../../assets/darkchevron.svg";
import ChevronLight from "../../assets/chevron.svg";

import Account from "../../assets/accountdark.svg";
import Add from "../../assets/add.svg";
import { Link } from "react-router-dom";

function SidebarButton({ buttonStyle, size }) {
  if (buttonStyle === "login") {
    return (
      <>
        <Link
          to="/login"
          className={`sidebar-button secondary ${buttonStyle} ${size}`}
        >
          <div className="sidebar-button__content">
            <img
              src={Account}
              alt="Account"
              className="sidebar-button__account"
            />
            <div className="sidebar-button__text">
              <span>Log in of registreer</span>
              <span>Ontgrendel alle functies</span>
            </div>
          </div>
          <img src={Chevron} alt="Chevron" className="sidebar-button__icon" />
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link
          to="/nieuwe-post"
          className={`sidebar-button primary ${buttonStyle} ${size}`}
        >
          <div className="sidebar-button__content ">
            <img
              src={Add}
              alt="Add"
              className="sidebar-button__account primary"
            />
            <div className="sidebar-button__text primary">
              <span>Post maken</span>
              <span>Deel jouw kennis en ervaring</span>
            </div>
          </div>
          <img
            src={ChevronLight}
            alt="Chevron"
            className="sidebar-button__icon"
          />
        </Link>
      </>
    );
  }
}

export default SidebarButton;
