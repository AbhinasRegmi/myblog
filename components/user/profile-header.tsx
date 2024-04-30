"use client";

import { PenIcon, LogOut } from "lucide-react";

import {
    ThreeDots, ThreeDotsPros
} from "@/components/ui/three-dots";
import {
    ProfileAvatar
} from "@/components/user/profile-avatar";

interface ProfileHeaderProps {
    name: string,
    imageUrl?: string,
}
export function ProfileHeader(props: ProfileHeaderProps) {
    const items = {
        label: "Action",
        content: [
            {
                //TODO: Edit your profile link has to be build.
                label: "Edit your profile",
                href: "",
                icon: PenIcon
            },
            {
                label: "Logout",
                href: "/auth/signout",
                icon: LogOut
            }
        ]
    } satisfies ThreeDotsPros;

    return (
        <div className="pt-12 pb-6 flex items-center justify-between">
            <h1 className="text-2xl flex items-center gap-3">
                <ProfileAvatar imageUrl={props.imageUrl} />
                <div className="line-clamp-1 w-[200px] md:w-full">
                    {props.name}
                </div>
            </h1>
            <div className="shrink-0">

                <ThreeDots {...items} />
            </div>
        </div>
    )
}