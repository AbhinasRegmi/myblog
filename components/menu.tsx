"use client";

import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import {MenuItems} from "@/components/menu-items";
import { MENU_ITEMS } from "@/lib/data";

export function NavMenu() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="size-10" />
            </SheetTrigger>
            <SheetContent>
                <div className="py-12">
                    <MenuItems data={MENU_ITEMS} />
                </div>
            </SheetContent>
        </Sheet>
    )
}