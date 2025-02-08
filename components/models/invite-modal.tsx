"use client";

import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle
} from "@/components/ui/dialog";



import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteModal = () => {

    const {openModal,isOpen, closeModal, type,data} = useModal();

    const origin =useOrigin();
    const {server} =data;
    const isModalOpen = isOpen && type === "invite";

    const [copied, setCopied] = useState(false);
    const [isloading , setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew=async () => {
        try{
            setIsLoading(true);
            const resesponse = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            console.log("resesponse is",resesponse.data);
            openModal("invite", {server: resesponse.data});
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }

    }




        return (
                <Dialog open={isModalOpen} onOpenChange={closeModal} >
                        <DialogContent className="bg-white dark:text-neutral-400 p-0 overflow-hidden">
                                <DialogHeader className="pt-8 px-6">
                                        <DialogTitle className="text-2xl text-center font-bold">
                                                Invite Friends
                                        </DialogTitle>

                                </DialogHeader>
                          <div className="p-6">
                        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Invite Link </Label>
                        <div className="flex items-center mt-2 gap-x-2 ">
                            <Input disabled={isloading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl}/>
                            <Button disabled={isloading} size="icon" onClick={onCopy}>
                                {
                                copied ?
                                <Check className="w-4 h-4"/>:
                                <Copy className="w-4 h-4"/>}
                                </Button>

                        </div>
                        <Button
                        onClick={onNew}
                        disabled={isloading} variant="link" size="sm" className="text-xs text-zinc-500 mt-4">Generate a new link
                            <RefreshCcw className="w-4 h-4 ml-2"/>
                        </Button>
                          </div>

                        </DialogContent>
                </Dialog>
        );
};
