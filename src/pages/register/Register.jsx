import "./Register.css";
import { useState } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useNavigate } from "react-router-dom";

import flairlogin from "../../assets/flairlogin.svg";

import axios from "axios";

const API_HEADERS = {
  "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
};

function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  async function registerFunction(e) {
    e.preventDefault();

    try {
      const registerPost = await axios.post(
        "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
        {
          email: mail,
          password: password,
          username: name,
        },
        {
          headers: API_HEADERS,
        },
      );
      setResult(registerPost.data);
      navigate("/login");
      console.log(registerPost.data);
    } catch (error) {
      console.error(error);
    }

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
