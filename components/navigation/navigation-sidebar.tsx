import {redirect} from "next/navigation";
import {UserButton} from "@clerk/nextjs"

import {currentProfile} from "@/lib/current-profile";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ModeToggle} from "@/components/mode-toggle";

import {db} from "@/lib/db";
import {NavigationAction} from "@/components/navigation/navigation-action";
import {NavigationItem} from "@/components/navigation/navigation-item";

// The `NavigationSidebar` component is an asynchronous function that renders the navigation sidebar for the application. It fetches the current user's profile and the servers the user is a member of, and then renders a navigation sidebar with the user's servers, a mode toggle, and a user button.

export const NavigationSidebar =async () => {

    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
        >

        <NavigationAction/>

        <Separator
            className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        />

        <ScrollArea className="flex-1 w-full">
            {
                servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))
            }

        </ScrollArea>

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}

                />
            </div>

        </div>
    );
}
