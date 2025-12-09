"use client";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null, isConnected: false
});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", {
            path: "/api/socket/io",
            addTrailingSlash: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            timeout: 20000,
        });

        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to socket");
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from socket");
        });

        socketInstance.on("reconnect_attempt", (attemptNumber) => {
            console.log(`Reconnection attempt ${attemptNumber}`);
        });

        socketInstance.on("reconnect_failed", () => {
            console.error("Failed to reconnect to socket after maximum attempts");
        });

        socketInstance.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        socket,
        isConnected
    }), [socket, isConnected]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
}
