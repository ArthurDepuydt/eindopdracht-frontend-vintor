import { useState } from "react";
import searchIcon from "../../assets/search.svg";
import "./Input.css";

function Input({ value, setValue, type, id, name, label, style, placeholder }) {
  if (label === undefined) {
    if (id === "search") {
      return (
        <div className="input-wrapper">
          <>
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={style}
              placeholder={placeholder}
            />
            <img src={searchIcon} alt="Search" className="search-icon " />
          </>
        </div>
      );
    } else {
      return (
        <>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={style}
            placeholder={placeholder}
          />
        </>
      );
    }
  } else
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={style}
        />
      </>
    );
}

export default Input;
