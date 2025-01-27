import { useEffect, useState } from "react";
import ServerComponent from "@/components/Server";
import ServersService from "@/services/servers";
import ServerType from "@/types/server";
import { io } from "socket.io-client";
import Login from "./components/Login";
function App() {
  <Login />;
  const [servers, setServers] = useState<ServerType[]>([]);
  const SOCKET_SERVER_URL = "http://localhost:4000";

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

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className="bg-white min-h-[60vh] max-h-[70vh] w-[50vw] rounded overflow-auto">
        <h4 className="font-bold leading-none p-4 text-center text-lg text-indigo-950">
          Servers Updates
        </h4>

        <div className="flex flex-col justify-center items-center p-2 gap-1">
          {servers.map((server, index) => (
            <ServerComponent key={index} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
