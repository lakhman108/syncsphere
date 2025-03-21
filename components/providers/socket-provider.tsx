"use client";
import {CreateServerModal} from "@/components/models/create-server-modal";
import {createContext,useState,useEffect,useContext} from "react";
import {io as ClientIO} from "socket.io-client";

type SocketContextType = {
    socket: any |null;
    isConnected : boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket:null,isConnected:false
});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider= ({
    children
}:{
    children:React.ReactNode
}) => {
    const [socket,setSocket] = useState(null);
    const [isConnected,setIsConnected] = useState(false);

    useEffect(()=>{
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to socket");
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from socket");
        });

        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        }
    },[]);

    return (
        <SocketContext.Provider value={{socket,isConnected}}>
            {children}
        </SocketContext.Provider>
    );
}
