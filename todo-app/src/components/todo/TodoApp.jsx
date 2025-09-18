import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";
import ErrorComponent from "./todo/ErrorComponent";
import HeaderComponent from "./todo/HeaderComponent";
import LogoutComponent from "./todo/LogoutComponent";
import FooterComponent from "./todo/FooterComponent";
import WelcomeComponent from "./todo/WelcomeComponent";
import ListTodosComponent from "./todo/ListTodosComponent";
import LoginComponent from "./todo/LoginComponent";
import AuthProvider, { useAuth } from "../security/AuthContext";
import TodoComponent from "./todo/TodoComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}
export default function TodoApp() {
  return (
    <AuthProvider>
      <div className="Todoapp">
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorComponent />}></Route>
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
