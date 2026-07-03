import { useState } from "react";
import searchIcon from "../../assets/search.svg";

import Button from "../../components/button/Button";

import "./Input.css";

function Input({
  value,
  setValue,
  type,
  id,
  name,
  label,
  style,
  placeholder,
  error,
}) {
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
    } else if (id === "reactie") {
      return (
        <div className="textarea-wrapper">
          <textarea
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={style}
            placeholder={placeholder}
            rows="1"
          />
          <Button
            type="submit"
            style="primary onInput"
            value="Plaatsen"
          ></Button>
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
  } else if (type === "textarea") {
    return (
      <>
        <div className="input-text-wrapper">
          <label htmlFor={name}>{label}</label>
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={style}
            rows="4"
          />
          {error && <span className="input-error-message">{error}</span>}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="input-text-wrapper">
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
          {error && <span className="input-error-message">{error}</span>}
        </div>
      </>
    );
  }
}

export default Input;
