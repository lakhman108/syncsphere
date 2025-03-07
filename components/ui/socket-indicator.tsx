"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant="outline" className="bg-yellow-600 text-white border-none">
                Fallback: Polling every 1s
            </Badge>
        );
    }
    return (
        <Badge variant="outline" className="bg-green-600 text-white border-none">
            using realtime updates
    </Badge>
    ); // Added to handle the case when isConnected is true
};
