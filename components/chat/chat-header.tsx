import { Hash, HashIcon, Menu } from "lucide-react";
import { MobilToggle } from "@/components/mobil-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/ui/socket-indicator";

interface ChatHeaderProps{
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({serverId, name, type, imageUrl}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-b-2">
      <MobilToggle serverId={serverId}/>
      {
        type === "channel" && (
          <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
        )
      }
      {
        type === "conversation" && (
            <UserAvatar src={imageUrl} className="w-8 h-8 md:h-8 md:w-8 mr-2"/>
        )
      }
    <p
    className="font-semibold text-md text-black dark:text-white">
    {name}
    </p>
    
      <div className="ml-auto flex items-center">
        <SocketIndicator/>
      </div>

    </div>
  );
};

export default ChatHeader;
