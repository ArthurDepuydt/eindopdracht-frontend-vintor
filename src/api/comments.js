import { apiClient, authHeader } from "./client";

export async function createComment(commentPayload, token) {
  try {
    const response = await apiClient.post("/comments", commentPayload, {
      headers: authHeader(token),
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het plaatsen van de reactie:", error);
    return [null, error.message];
  }
}
