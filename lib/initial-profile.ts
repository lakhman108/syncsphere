import { RedirectToSignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server'
import { db } from "@/lib/db";
import { generateAvatar } from "@/lib/generate-avatar";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

export const initialProfile = async () => {
    try {
        const user = await currentUser()

        if (!user) {
            return RedirectToSignIn({ signInForceRedirectUrl: "/sign-in" });
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        });

        if (profile) {
            return profile;
        }

        const userName = `${user.firstName} ${user.lastName}`;
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: userName,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });

        // Auto-create a default server for the new user
        await db.server.create({
            data: {
                profileId: newProfile.id,
                name: `${userName}'s Server`,
                imageUrl: generateAvatar(userName),
                inviteCode: uuidv4(),
                channels: {
                    create: [{ name: "general", profileId: newProfile.id }]
                },
                members: {
                    create: [{ profileId: newProfile.id, role: MemberRole.ADMIN }]
                }
            }
        });

        return newProfile;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

