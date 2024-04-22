import { Suspense } from "react";

import { Logo } from "@/components/logo";
import { SearchForm } from "@/components/search";

export async function NavBar() {
    return (
        <nav className="border-b-2 md:py-2
        sticky top-0 right-0 left-0 isolate z-10
        bg-white/85 backdrop-blur-sm
        ">
            <div className="md:container flex">
                <div className="flex items-center gap-1">
                    <Logo />
                    <div className="hidden md:block">
                        <Suspense>
                            <SearchForm />
                        </Suspense>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </nav>
    )
}