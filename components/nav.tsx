import { Suspense } from "react";

import { Logo } from "@/components/logo";
import { SearchForm } from "@/components/search";

export async function NavBar() {
    return (
        <nav className="border-b-2 md:py-2">
            <div className="container flex">
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