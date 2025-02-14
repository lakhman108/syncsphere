import { v4 as uuidv4 } from "uuid";
import {NextResponse} from "next/server";

import {currentProfile} from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";
import {db} from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        console.log("profile", "here i am how are you doing");
        const server = await db.server.create({
            data: {
                profileId:profile.id,
                name:name,
                imageUrl:imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        { name:"general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }

            }
        });

        return NextResponse.json(server);

    } catch(error) {
        console.log("here dear");
        console.log("[SERVERS_POST]",error);

        return new NextResponse("Internal Error", { status: 500 });
    }
}

