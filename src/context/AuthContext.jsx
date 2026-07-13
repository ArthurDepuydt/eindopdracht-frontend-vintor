import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { fetchCurrentUser } from "../api/auth";

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
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth({ isAuth: false, user: null, status: "done" });
      } else {
        const decodedToken = jwtDecode(token);
        await getUser(decodedToken.userId, token);
      }
    }
    checkAuth();
  }, []);

  async function loginFunction(e, mail, token) {
    e.preventDefault();
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    await getUser(decoded.userId, token);
    navigate("/mijn-posts");
  }

  async function getUser(id, token) {
    const [user, error] = await fetchCurrentUser(id, token);
    if (error) {
      console.error(error);
      localStorage.removeItem("token");
      setAuth({ isAuth: false, user: null, status: "done" });
      navigate("/");
      return;
    }
    setAuth({
      isAuth: true,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
      status: "done",
    });
  }

  function logoutFunction(e) {
    setAuth({ isAuth: false, user: null, status: "done" });

    localStorage.removeItem("token");

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
