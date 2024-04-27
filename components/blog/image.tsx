"use client";

import { ImagePlus } from "lucide-react";
import { MutableRefObject, useContext, useEffect, useRef, useState, useTransition } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";


import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import { useWindowDimensions } from "@/hooks/window-dim";
import { CLOUDINARY_SIGNATURE_ROUTE } from "@/routes";
import { BlogComponentProps } from "@/components/blog/comp";
import { deleteBlogComponentAction, updateBlogComponentAction } from "@/action/blog";
import { blogContext } from "@/context/blog-context";


interface UploadedAssetData {
    public_id: string;
    width: number;
    height: number;
    id: string;
}

interface ImageUploadProps {
    setPublicUrl: (i: string) => void;
    openRef: MutableRefObject<(() => void) | null>;

}
export function ImageUpload(props: ImageUploadProps) {

    return (
        <div>
            <CldUploadWidget
                signatureEndpoint={CLOUDINARY_SIGNATURE_ROUTE}
                options={{
                    sources: ['local'],
                    multiple: false
                }}
                onSuccess={(result) => {
                    const data = result?.info as UploadedAssetData;
                    if (data.public_id) {
                        props.setPublicUrl(data.public_id);
                    }
                }}
            >
                {({ open }) => {
                    props.openRef.current = open;
                    return <div></div>
                }}
            </CldUploadWidget>
        </div>
    )
}



export function ImageContext(props: BlogComponentProps) {
    const [publicUrl, setPublicUrl] = useState<string | undefined>(props.content ?? undefined);
    const [isPending, startTransition] = useTransition();
    const { dispatch } = useContext(blogContext);

    const openRef = useRef<(() => void) | null>(null);

    function handleDelete() {
        startTransition(async () => {
            await deleteBlogComponentAction({
                blogID: props.blogId,
                componentID: props.id
            });
        })

        setPublicUrl(undefined);
        if (dispatch) {
            dispatch({ type: 'delete', id: props.id, label: props.label, blogID: props.blogId });
        }
    }

    return (
        <div>
            <ContextMenu>
                <ContextMenuTrigger>
                    {
                        !!publicUrl ? <StaticImage publicUrl={publicUrl} data={props} /> : <ImagePlaceholder />
                    }
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuItem onClick={() => {
                        openRef.current?.();
                    }}>
                        Upload New
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => {
                        handleDelete();
                    }}>
                        Delete Image
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>


            <ImageUpload
                openRef={openRef}
                setPublicUrl={setPublicUrl}
            />

        </div>
    )
}

function ImagePlaceholder() {
    return (
        <div className="
                w-full md:w-2/3 aspect-square md:aspect-video
                flex items-center justify-center mx-auto
                border-4 rounded-lg border-muted-foreground/20
                my-4 bg-white shadow-md cursor-pointer
            ">
            <div className="text-center">
                <div className="flex justify-center">
                    <ImagePlus size={50} className="text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground/55 text-center">Upload Images</div>
            </div>
        </div>
    )
}

export function StaticImage({ publicUrl, data }: { publicUrl: string, data: BlogComponentProps }) {
    const { width } = useWindowDimensions();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            await updateBlogComponentAction({
                ...data,
                content: publicUrl
            })
        })
    }, [publicUrl, data])

    return (
        <CldImage
            alt="Blog image"
            src={publicUrl ?? ''}
            width={width ?? 1000}
            height={1000}
            className="object-cover w-full h-auto"
        />
    )
}