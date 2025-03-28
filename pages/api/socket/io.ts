import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIO } from "socket.io";

import { NextApiResponseServerIo } from "@/lib/types";

export const config = {
    api: {
        bodyParser: false
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new SocketIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
              }
        });
        res.socket.server.io = io;
    }

    res.end();
};

export default ioHandler;
