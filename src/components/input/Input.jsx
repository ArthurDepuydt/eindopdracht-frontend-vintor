import { useState } from "react";
import "./Input.css";

function Input({ value, setValue, type, id, name, label, style, placeholder }) {
  if (label === undefined) {
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
