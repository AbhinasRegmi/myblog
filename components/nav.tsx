import { Suspense } from "react";

import { Logo } from "@/components/logo";
import { SearchForm } from "@/components/search";
import { NavMenu } from "@/components/menu";
import {
    SigninOrProfile
} from "@/components/user/signin-or-profile";

export async function NavBar() {
    return (
        <nav className="border-b-2 md:py-2
        sticky top-0 right-0 left-0 isolate z-10
        bg-white/85 backdrop-blur-sm
        ">
            <div className="md:container flex justify-between">
                <div className="flex items-center gap-1">
                    <Logo />
                    <div className="hidden md:block">
                        <Suspense>
                            <SearchForm />
                        </Suspense>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-6 md:hidden">
                        <NavMenu />
                    </div>
                    <div className="hidden md:block">
                        <div className="pr-6">

                        <Suspense fallback={'Sign in'}>
                            <SigninOrProfile />
                        </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}