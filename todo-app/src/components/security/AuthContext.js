import { createContext, useContext, useState } from "react";
// import { executeBasicAuthenticationService } from "../todo/api/HelloWorldApiService";
import { apiClient } from "../todo/api/ApiClient";
import { executeJwtAuthenticationService } from "../todo/api/AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
  //Put some state in the context
  // const [number, setNumber] = useState(10);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        console.log(response.data);
        const jwtToken = "Bearer " + response.data.token;

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        console.log(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
