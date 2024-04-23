import {CircleUserRound, Search, PenTool} from "lucide-react";
import { NEW_BLOG_ROUTE, PROFILE_ROUTE } from "@/routes";

export const MENU_ITEMS = [
    {
        label: "Your Profile",
        href: PROFILE_ROUTE,
        icon: CircleUserRound
    },
    {
        label: "Search Blogs",
        href: "/find",
        icon: Search
    },
    {
        label: "Write new Blog",
        href: NEW_BLOG_ROUTE,
        icon: PenTool
    }
]