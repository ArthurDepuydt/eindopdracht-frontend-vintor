import "./Register.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import flairlogin from "../../assets/flairlogin.svg";

function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1 className="login-title">Registreren</h1>
          <img src={flairlogin} alt="Flair logo" className="login-flair-logo" />
          <form className="login-fields">
            <Input
              label="Naam"
              type="text"
              id="name"
              name="name"
              value={name}
              setValue={setName}
              style="text"
              placeholder="Naam"
            />
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

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="privacyverklaring"
                name="privacyverklaring"
                value="privacyverklaring"
              ></input>
              <label for="privacyverklaring">
                Ik ga akkoord met de privacyverklaring
              </label>
            </div>
            <Button
              value="Account aanmaken"
              style="primary mt-1"
              type="submit"
            />
          </form>
          <span>of</span>
          <div className="w-100">
            <Button
              value="Inloggen"
              style="secondary w-100"
              type="button"
              link="/login"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
