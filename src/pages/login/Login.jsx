import "./Login.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import flairlogin from "../../assets/flairlogin.svg";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1 className="login-title">Inloggen</h1>
          <img src={flairlogin} alt="Flair logo" className="login-flair-logo" />
          <form className="login-fields">
            <Input
              label="E-mailadres"
              type="text"
              id="email"
              name="email"
              value={mail}
              setValue={setMail}
              style="text"
              placeholder="E-mailadres"
            />
            <Input
              label="Wachtwoord"
              type="password"
              id="password"
              name="password"
              value={password}
              setValue={setPassword}
              style="text"
              placeholder="Wachtwoord"
            />
            <Button value="Inloggen" style="primary mt-1" type="submit" />
            <span>of</span>
            <Button
              value="Account aanmaken"
              style="secondary w-100"
              type="button"
              link="/registreren"
            />
          </form>
        </div>
      </section>
    </>
  );
}
export default Login;
