import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
export const executeBasicAuthenticationService = (token) =>
  apiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
