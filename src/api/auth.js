import { apiClient, authHeader } from "./client";

export async function loginUser(email, password) {
  try {
    const response = await apiClient.post("/login", { email, password });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het inloggen:", error);
    return [null, error.message];
  }
}

export async function registerUser(email, password, username) {
  try {
    const response = await apiClient.post("/users", {
      email,
      password,
      username,
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het registreren:", error);
    return [null, error.message];
  }
}

export async function fetchCurrentUser(id, token) {
  try {
    const response = await apiClient.get(`/users/${id}`, {
      headers: authHeader(token),
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de gebruiker:", error);
    return [null, error.message];
  }
}
