import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  console.log("Token no PrivateRoute:", token); // Verifique se o token é lido corretamente

  if (!token) {
    return <Navigate to="/" replace={true} />; // Certifique-se de que o caminho de redirecionamento está correto
  }

  return <>{children}</>;
};

export default PrivateRoute;
