import "./Register.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useNavigate } from "react-router-dom";

import flairlogin from "../../assets/flairlogin.svg";

import { registerUser } from "../../api/auth";

function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [mailError, setMailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_MIN = 2;
  const NAME_MAX = 50;
  const PASSWORD_MIN = 8;

  function validateForm() {
    let isValid = true;

    if (name.trim().length < NAME_MIN || name.trim().length > NAME_MAX) {
      setNameError(
        `Naam moet tussen ${NAME_MIN} en ${NAME_MAX} karakters lang zijn.`,
      );
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!EMAIL_REGEX.test(mail.trim())) {
      setMailError("Vul een geldig e-mailadres in.");
      isValid = false;
    } else {
      setMailError(null);
    }

    if (password.length < PASSWORD_MIN) {
      setPasswordError(
        `Wachtwoord moet minstens ${PASSWORD_MIN} karakters lang zijn.`,
      );
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  }

  async function registerFunction(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const [data, error] = await registerUser(mail, password, name);
    if (error) {
      console.error(error);
      return;
    }
    setResult(data);
    navigate("/login");

    console.log(
      `Gebruiker is geregistreerd! Gebruikersnaam: ${name}, Emailadres: ${mail}, Wachtwoord: ${password}`,
    );
  }

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1 className="login-title">Registreren</h1>
          <img src={flairlogin} alt="Flair logo" className="login-flair-logo" />
          <form className="login-fields" onSubmit={registerFunction}>
            <Input
              label="Naam"
              type="text"
              id="name"
              name="name"
              value={name}
              setValue={setName}
              style="text"
              placeholder="Naam"
              error={nameError}
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
              error={mailError}
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
              error={passwordError}
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
            <Button value="Account aanmaken" style="primary " type="submit" />
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
