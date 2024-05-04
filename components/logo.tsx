import Link from "next/link";
import Image from "next/image";

import LogoSVG from "@/public/images/logo.svg";

export async function Logo() {
    //TODO: Background Burn image white bg is blocking view.

    return (

        <Link href={"/"} className="flex items-center justify-center w-fit">
            <Image
                src={LogoSVG}
                height={10}
                width={30}
                alt="myBlog"
                className="h-[80px] w-[250px] object-cover"
            />
        </Link>
    )
}