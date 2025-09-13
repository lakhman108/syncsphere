"use client";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import axios from "axios";

import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


export const DeleteServerModal = () => {

    const {openModal,isOpen, closeModal, type,data} = useModal();
    const router=useRouter();

    const {server} =data;
    const isModalOpen = isOpen && type === "deleteServer";


    const [isloading , setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            closeModal();
            router.refresh();
            router.push("/");

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
                        <DialogContent className="bg-white dark:bg-[#313338] text-black dark:text-white p-0 overflow-hidden">
                                <DialogHeader className="pt-8 px-6">
                                        <DialogTitle className="text-2xl text-center font-bold">
                                             Delete Server
                                        </DialogTitle>

                                        <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400 text-base gap-2">
                                                Are you sure you want to do this? <span className="text-indigo-500 font-semibold">{server?.name}</span> will be permanently deleted.
                                        </DialogDescription>


                                </DialogHeader>
                                <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4">
                                <div
                                className="flex items-center justify-between w-full">
                                    <Button
                                    disabled={isloading}
                                    onClick={()=>closeModal()}
                                    variant={"ghost"}
                                    className="hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                     disabled={isloading}
                                     onClick={onClick}
                                     variant={"primary"}
                                     className="bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700">
                                        Confirm
                                    </Button>
                                </div>
                                </DialogFooter>


                        </DialogContent>
                </Dialog>
        );
};
