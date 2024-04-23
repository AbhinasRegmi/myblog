import Image from "next/image";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";


export function ProfileAvatar(props: { imageUrl?: string }) {
    return (
        <Avatar>
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