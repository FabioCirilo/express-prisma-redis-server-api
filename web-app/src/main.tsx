import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login.tsx";
import PrivateRoute from "./components/private.tsx";
import Register from "./pages/register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/App"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/cadastrar" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
