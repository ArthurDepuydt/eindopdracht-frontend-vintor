import "./Login.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

import { loginUser } from "../../api/auth";

import flairlogin from "../../assets/flairlogin.svg";

function Login() {
  const { login } = useContext(AuthContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [mailError, setMailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm() {
    let isValid = true;

    if (!EMAIL_REGEX.test(mail.trim())) {
      setMailError("Vul een geldig e-mailadres in.");
      isValid = false;
    } else {
      setMailError(null);
    }

    if (password.length === 0) {
      setPasswordError("Vul je wachtwoord in.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  }

  async function loginFunction(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const [data, error] = await loginUser(mail, password);
    if (error) {
      console.error(error);
      setLoginError(
        "Inloggen mislukt. Controleer je gegevens en probeer het opnieuw.",
      );
      return;
    }
    setLoginError(null);
    login(e, mail, data.token);

    console.log(
      `Gebruiker is ingelogd! Emailadres: ${mail}, Wachtwoord: ${password}`,
    );
  }

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1 className="login-title">Inloggen</h1>
          <img src={flairlogin} alt="Flair logo" className="login-flair-logo" />
          <form className="login-fields" onSubmit={loginFunction}>
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
            {loginError && <p className="input-error-message">{loginError}</p>}
            <Button value="Inloggen" style="primary " type="submit" />

            <span>of</span>
            <Button
              value="Account aanmaken"
              style="secondary w-100"
              type="submit"
              link="/registreren"
            />
          </form>
        </div>
      </section>
    </>
  );
}
export default Login;
