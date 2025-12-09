"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const MessageSkeleton = () => {
    return (
        <div className="flex items-start gap-x-3 p-4 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/10 transition">
            <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-col flex-1 gap-y-2">
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700" />
                    <Skeleton className="h-3 w-16 bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-700" />
                <Skeleton className="h-4 w-3/4 bg-zinc-300 dark:bg-zinc-700" />
            </div>
        </div>
    );
};

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col">
            {[...Array(10)].map((_, i) => (
                <MessageSkeleton key={i} />
            ))}
        </div>
    );
};
