import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Add from "../../assets/add.svg";
import Account from "../../assets/account.svg";
import { useState } from "react";
import Input from "../input/Input";

function Navbar() {
  const [search, setSearch] = useState("");

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
            <img src={Add} alt="Add item" className="logo" />
            <img src={Account} alt="Account" className="logo" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
