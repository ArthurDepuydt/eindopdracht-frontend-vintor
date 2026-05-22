import { useState } from "react";
import "./Sidebar.css";

import SidebarButton from "../sidebarButton/SidebarButton";

import Chevron from "../../assets/darkchevron.svg";

import Account from "../../assets/accountdark.svg";

import Motor from "../../assets/motor.svg";
import Carburateur from "../../assets/carburateur.svg";
import Restauratie from "../../assets/restauratie.svg";
import Elektrisch from "../../assets/elektrisch.svg";
import Interieur from "../../assets/interieur.svg";
import Onderhoud from "../../assets/onderhoud.svg";

function Sidebar({ showPost, showTags, showLogin }) {
  return (
    <>
      <div className="sidebar">
        {showPost && <SidebarButton buttonStyle="post" size="big" />}
        <div className="sidebar-popular">
          <h3 className="sidebar-popular__title">Populaire tags</h3>
          <div className="sidebar-popular__tags">
            <div className="sidebar-popular__tag">
              <img src={Motor} alt="Motor" />
              <span>motor</span>
            </div>
            <div className="sidebar-popular__tag">
              <img src={Carburateur} alt="Carburateur" />
              <span>carburateur</span>
            </div>
            <div className="sidebar-popular__tag">
              <img src={Restauratie} alt="Restauratie" />
              <span>restauratie</span>
            </div>
            <div className="sidebar-popular__tag">
              <img src={Elektrisch} alt="Elektrisch" />
              <span>elektrisch</span>
            </div>
            <div className="sidebar-popular__tag">
              <img src={Interieur} alt="Interieur" />
              <span>interieur</span>
            </div>
            <div className="sidebar-popular__tag">
              <img src={Onderhoud} alt="Onderhoud" />
              <span>onderhoud</span>
            </div>
          </div>
        </div>
        {showLogin && <SidebarButton buttonStyle="login" size="big" />}
      </div>
    </>
  );
}

export default Sidebar;
