"use client";

import { ServerWithMembersWithProfile } from "@/lib/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from
"@/components/ui/dropdown-menu";
import { ChevronDown,LogOutIcon,PlusCircle,Settings,Trash,UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfile;
    role?:MemberRole;

}

export const ServerHeader = ({server,role}:ServerHeaderProps) => {
const isAdmin=role===MemberRole.ADMIN;
const isModerator=isAdmin || role===MemberRole.MODERATOR;
const {openModal,closeModal}=useModal();
// console.log(isModerator);
    return(
       <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
        {server.name}
        <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
            {
                isModerator && (
                    <DropdownMenuItem
                    onClick={() => openModal("invite", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
            {
                isAdmin && (
                    <DropdownMenuItem
                    onClick={() => openModal("editServer", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Server Settings

                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
            {
                isAdmin && (
                    <DropdownMenuItem
                    onClick={() => openModal("members", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Manage Members

                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
             {
                isModerator && (
                    <DropdownMenuItem
                    onClick={() => openModal("createChannel", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Create Channels

                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
            {
                isModerator && (

                        <DropdownMenuSeparator />

                )
            }
            {
                isAdmin && (
                    <DropdownMenuItem
                    onClick={() => openModal("deleteServer", { server })}
                    className="text-rose-500   px-3 py-2 text-sm cursor-pointer">
                        Delete Server

                        <Trash className=" h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
            {

                !isAdmin && (
                    <DropdownMenuItem
                    onClick={() => openModal("leaveServer", { server })}
                    className="text-rose-500   px-3 py-2 text-sm cursor-pointer">
                        Leave Server
                        <LogOutIcon className=" h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )
            }
        </DropdownMenuContent>
       </DropdownMenu>
    );
};
