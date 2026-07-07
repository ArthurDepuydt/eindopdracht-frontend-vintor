import "./Button.css";
import { Link } from "react-router-dom";

function Button({ value, type, style, link, disabled }) {
  if (link) {
    return (
      <Link to={link}>
        <button className={`button ${style}`} type={type} disabled={disabled}>
          {value}
        </button>
      </Link>
    );
  } else {
    return (
      <button className={`button ${style}`} type={type} disabled={disabled}>
        {value}
      </button>
    );
  }
}

export default Button;
