import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import ServerComponent from "@/components/Server";
import ServersService from "@/services/servers";
import AuthService from "@/services/auth"; // Importar o AuthService
import ServerType from "@/types/server";
import { io } from "socket.io-client";

function App() {
  const [servers, setServers] = useState<ServerType[]>([]);
  const SOCKET_SERVER_URL = "http://localhost:4000";
  const navigate = useNavigate(); // Obtém a função de navegação

  const getServers = async () => {
    try {
      const data = await ServersService.getServers();
      setServers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServers();
    const socket = io(SOCKET_SERVER_URL);

    socket.on("serverUpdate", (server) => {
      console.log("Server update received:", server);
      setServers((prevServers) => [...prevServers, server.data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Iniciando logout...");
      await AuthService.logout(); // Chama o serviço de logout
      console.log("Token removido com sucesso.");
      navigate("/"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-full">
      <div className="bg-white min-h-[60vh] max-h-[70vh] w-[50vw] rounded overflow-auto p-4">
        <h4 className="font-bold leading-none text-center text-lg text-indigo-950 mb-4">
          Servers Updates
        </h4>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded mb-4"
        >
          Logout
        </button>
        <div className="flex flex-col justify-center items-center gap-1">
          {servers.map((server, index) => (
            <ServerComponent key={index} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
