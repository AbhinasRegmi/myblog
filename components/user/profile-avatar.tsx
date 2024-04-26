"use client";

import Image from "next/image";
import {usePathname} from "next/navigation";
import {PROFILE_ROUTE} from "@/routes";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";


export function ProfileAvatar(props: { imageUrl?: string }) {
    const pathname = usePathname();
    const isProfilePage = !!pathname.startsWith(PROFILE_ROUTE);

    return (
        <Avatar
            className={cn(
                isProfilePage && "ring ring-ring ring-offset-2 ring-offset-background"
            )}
        >
            <Image
                src={props.imageUrl ?? ''}
                alt="User"
                height={32}
                width={32}
                className="object-cover w-full"
            />
            <AvatarFallback>
                mB
            </AvatarFallback>
        </Avatar>
    )
}