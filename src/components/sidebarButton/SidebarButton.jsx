import { useState } from "react";
import "./SidebarButton.css";

import Chevron from "../../assets/darkchevron.svg";
import ChevronLight from "../../assets/chevron.svg";

import Account from "../../assets/accountdark.svg";
import Add from "../../assets/add.svg";

function SidebarButton({ buttonStyle, size }) {
  if (buttonStyle === "login") {
    return (
      <>
        <button className={`sidebar-button secondary ${buttonStyle}`}>
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
        </button>
      </>
    );
  } else {
    return (
      <>
        <button className={`sidebar-button primary ${buttonStyle}`}>
          <div className="sidebar-button__content ">
            <img
              src={Add}
              alt="Account"
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
        </button>
      </>
    );
  }
}

export default SidebarButton;
