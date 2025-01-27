import axiosClient from "@/config/axios-client";
import ServerType from "@/types/server";
import { AxiosError, AxiosResponse } from "axios";

const ServersService = {
  getServers: async (): Promise<ServerType[]> => {
    try {
      const response: AxiosResponse<ServerType[]> = await axiosClient.get(
        "/servers"
      );
      return response.data.data;
    } catch (error: AxiosError | any) {
      console.error("Error fetching servers:", error?.message || error);
      return [];
    }
  },

  getServerDetails: async (serverId: number): Promise<ServerType | null> => {
    try {
      const response: AxiosResponse<ServerType> = await axiosClient.get(
        `/servers/${serverId}`
      );
      return response.data;
    } catch (error: AxiosError | any) {
      console.error("Error fetching server details:", error?.message || error);
      return null;
    }
  },

  createServer: async (serverData: ServerType): Promise<ServerType | null> => {
    try {
      const response: AxiosResponse<ServerType> = await axiosClient.post(
        "/servers",
        serverData
      );
      return response.data;
    } catch (error: AxiosError | any) {
      console.error("Error creating server:", error?.message || error);
      return null;
    }
  },

  updateServer: async (
    serverId: number,
    updatedServerData: ServerType
  ): Promise<ServerType | null> => {
    try {
      const response: AxiosResponse<ServerType> = await axiosClient.put(
        `/servers/${serverId}`,
        updatedServerData
      );
      return response.data;
    } catch (error: AxiosError | any) {
      console.error("Error updating server:", error?.message || error);
      return null;
    }
  },

  deleteServer: async (serverId: number): Promise<boolean> => {
    try {
      await axiosClient.delete(`/servers/${serverId}`);
      console.log("Server deleted successfully.");
      return true;
    } catch (error: AxiosError | any) {
      console.error("Error deleting server:", error?.message || error);
      return false;
    }
  },
};

export default ServersService;
