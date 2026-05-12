import { useState } from "react";
import "./Sidebar.css";

import SidebarButton from "../sideBarButton/SidebarButton";

import Chevron from "../../assets/darkchevron.svg";

import Account from "../../assets/accountdark.svg";

function Sidebar({ showPost, showTags, showLogin }) {
  return (
    <>
      <div className="sidebar">
        {showPost && <SidebarButton buttonStyle="post" size="big" />}
        {/* {showLogin && (
          
        )} */}
        {showLogin && <SidebarButton buttonStyle="login" size="big" />}
      </div>
    </>
  );
}

export default Sidebar;
