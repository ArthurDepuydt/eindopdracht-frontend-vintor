import "./Button.css";
import { Link } from "react-router-dom";

function Button({ value, type, style, link }) {
  if (link) {
    return (
      <Link to={link}>
        <button className={`button ${style}`} type={type}>
          {value}
        </button>
      </Link>
    );
  } else {
    return (
      <button className={`button ${style}`} type={type}>
        {value}
      </button>
    );
  }
}

export default Button;
