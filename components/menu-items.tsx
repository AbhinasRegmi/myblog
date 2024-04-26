import { type LucideIcon } from "lucide-react"

interface MenuItemsProps {
    data: {
        label: string;
        href: string;
        icon: LucideIcon;
    }[]
}

export function MenuItems(props: MenuItemsProps) {
    //TODO: Icon identification when on proper route.
    return (
        <ul className="space-y-2 divide-y">
            {
                props.data.map(item => (
                    <li key={item.href}>
                        <a href={item.href}
                        className="flex gap-2 items-center text-xl hover:bg-muted-foreground/5 px-4 py-4 rounded-md text-muted-foreground"
                        >
                            <item.icon /> <span className="text-foreground">{item.label}</span>
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}