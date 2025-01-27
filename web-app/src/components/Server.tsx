import { FC } from "react";
import ServerType from "@/types/server";
import { RectangleEllipsis, Server } from "lucide-react";

const ServerComponent: FC<{ server: ServerType }> = ({ server }) => {
  return (
    <div className="w-3/4 bg-slate-300 h-[60px] rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center p-1">
          <div>
            <Server className="text-indigo-500 w-[30px]" />
          </div>
          <div className="flex items-center gap-2 pl-3">
            <div>
              <h5 className="text-lg"> {server.name}</h5>
              <span className="text-sm text-slate-500">
                {server.ip}:{server.port || "not provided"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button className="w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-2 py-1">
            <RectangleEllipsis className="w-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerComponent;
