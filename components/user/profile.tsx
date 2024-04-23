import { ProfileSide } from "@/components/user/profile-side";
import { ProfileHeader } from "@/components/user/profile-header";
import { Separator } from "@/components/ui/separator";


interface ProfileProps {
    name: string;
    imageUrl?: string;
}
export function Profile(props: ProfileProps) {
    //TODO: SideBar and Profile Content
    return (
        <div className="w-full md:flex">
            <div className="md:flex-grow-0 md:flex-shrink-0 md:w-1/2">
                <div className="px-4">
                    <ProfileHeader {...props} />
                </div>
                <Separator />
            </div>
            <div className="w-[1px] bg-border hidden md:block"></div>
            <ProfileSide />
        </div>
    )
}