import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


export const currentProfile = async () => {
    const { userId } =await auth();
    const loggs=await auth();
    console.log("userId", loggs);
    if(!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}
