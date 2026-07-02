import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      console.log("check gebruiker");
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("geen gebruiker");
        setAuth({ isAuth: false, user: null, status: "done" });
      } else {
        const decodedToken = jwtDecode(token);
        await getUser(decodedToken.userId, token);
        console.log("wel gebruiker");
      }
    }
    checkAuth();
  }, []);

  async function loginFunction(e, mail, token) {
    e.preventDefault();
    localStorage.setItem("token", token);

    console.log(localStorage.getItem("token"));

    const decoded = jwtDecode(token);
    console.log(decoded);

    await getUser(decoded.userId, token);
    navigate("/mijn-posts");
  }

  async function getUser(id, token) {
    try {
      const actualUser = await axios.get(
        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAuth({
        isAuth: true,
        user: {
          username: actualUser.data.username,
          email: actualUser.data.email,
          id: actualUser.data.id,
        },
        status: "done",
      });
      console.log("Gebruiker is ingelogd!");
    } catch (error) {
      console.error(error);
    }
  }

  function logoutFunction(e) {
    setAuth({ isAuth: false, user: null, status: "done" });

    localStorage.removeItem("token");

    console.log("Gebruiker is uitgelogd!");
    navigate("/");
  }

  const data = {
    isAuth: auth.isAuth,
    user: auth.user,
    login: loginFunction,
    logout: logoutFunction,
  };

  return (
    <AuthContext.Provider value={data}>
      {auth.status === "pending" ? (
        <div className="loadState">
          <div>De pagina is aan het laden...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
