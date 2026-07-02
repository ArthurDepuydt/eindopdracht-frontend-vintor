import "./Login.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

import axios from "axios";

import flairlogin from "../../assets/flairlogin.svg";

const API_HEADERS = {
  "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
};

function Login() {
  const { login } = useContext(AuthContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  async function loginFunction(e) {
    e.preventDefault();

    try {
      const loginPost = await axios.post(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
        {
          email: mail,
          password: password,
        },
        {
          headers: API_HEADERS,
        },
      );
      setResult(loginPost.data);
      console.log(loginPost.data.token);
      login(e, mail, loginPost.data.token);
    } catch (error) {
      console.error(error);
    }

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
